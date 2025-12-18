package com.tasueom.inventory_manager.service;

import com.tasueom.inventory_manager.dto.InventoryRequestDto;
import com.tasueom.inventory_manager.dto.InventoryResponseDto;
import com.tasueom.inventory_manager.entity.Inventory;
import com.tasueom.inventory_manager.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    public InventoryResponseDto createInventory(InventoryRequestDto dto) {
        Inventory inventory = new Inventory(dto.getName(), dto.getUnitPrice(), dto.getQuantity());

        Inventory savedInventory = inventoryRepository.save(inventory);

        return toResponseDto(savedInventory);
    }

    public List<InventoryResponseDto> getInventoryList() {
        List<Inventory> entityList = inventoryRepository.findAll();
        List<InventoryResponseDto> dtoList = new ArrayList<>();

        for (Inventory inventory : entityList) {
            InventoryResponseDto dto = toResponseDto(inventory);
            dtoList.add(dto);
        }

        return dtoList;
    }

    public InventoryResponseDto getInventory(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id:=" + id));

        return toResponseDto(inventory);
    }

    @Transactional
    public InventoryResponseDto updateInventory(Long id, InventoryRequestDto dto) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id:=" + id));

        inventory.update(dto.getName(), dto.getUnitPrice(), dto.getQuantity());

        return toResponseDto(inventory);
    }

    @Transactional
    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }

    private InventoryResponseDto toResponseDto(Inventory inventory) {
        InventoryResponseDto responseDto = new InventoryResponseDto();
        responseDto.setName(inventory.getName());
        responseDto.setUnitPrice(inventory.getUnitPrice());
        responseDto.setQuantity(inventory.getQuantity());
        long totalPrice = (long) inventory.getUnitPrice() * inventory.getQuantity();
        responseDto.setTotalPrice(totalPrice);

        return responseDto;
    }
}
