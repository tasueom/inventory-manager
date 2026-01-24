package com.tasueom.inventory_manager;

import com.tasueom.inventory_manager.entity.Inventory;
import com.tasueom.inventory_manager.repository.InventoryRepository;
import com.tasueom.inventory_manager.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.OptimisticLockingFailureException;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class InventoryPurchaseTest {

    @Autowired
    InventoryService inventoryService;

    @Autowired
    InventoryRepository inventoryRepository;

    private Long inventoryId;

    @BeforeEach
    void setUp() {
        inventoryRepository.deleteAll(); // 테스트 독립성
        Inventory inv = inventoryRepository.save(new Inventory("test", 1000, 20));
        inventoryId = inv.getId();
    }

    @Test
    void purchase_success_single_thread() {
        // when
        inventoryService.purchase(inventoryId, 3);

        // then
        Inventory after = inventoryRepository.findById(inventoryId).orElseThrow();
        assertEquals(17, after.getQuantity());
    }

    @Test
    void purchase_concurrency_optimistic_lock() throws Exception {
        int threadCount = 30;
        ExecutorService pool = Executors.newFixedThreadPool(threadCount);

        CountDownLatch ready = new CountDownLatch(threadCount);
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(threadCount);

        AtomicInteger success = new AtomicInteger();
        AtomicInteger optimisticFail = new AtomicInteger();
        AtomicInteger otherFail = new AtomicInteger();

        for (int i = 0; i < threadCount; i++) {
            pool.submit(() -> {
                ready.countDown();
                try {
                    start.await();
                    inventoryService.purchase(inventoryId, 1);
                    success.incrementAndGet();
                } catch ( OptimisticLockingFailureException e) {
                    optimisticFail.incrementAndGet();
                } catch (Exception e) {
                    otherFail.incrementAndGet();
                } finally {
                    done.countDown();
                }
                return null;
            });
        }

        ready.await();      // 모든 스레드 준비 대기
        start.countDown();  // 동시에 시작
        done.await();       // 모두 종료 대기
        pool.shutdown();

        Inventory after = inventoryRepository.findById(inventoryId).orElseThrow();

        // 성공한 횟수만큼 재고가 감소해야 함
        assertEquals(20 - success.get(), after.getQuantity());

        // 환경에 따라 충돌이 항상 발생하진 않아서 "0보다 크다" 정도로만 체크(느슨하게)
        assertTrue(success.get() > 0);

        System.out.println("success=" + success.get()
            + ", optimisticFail=" + optimisticFail.get()
            + ", otherFail=" + otherFail.get());
    }
}
