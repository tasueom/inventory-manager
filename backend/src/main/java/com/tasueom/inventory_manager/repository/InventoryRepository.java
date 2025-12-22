package com.tasueom.inventory_manager.repository;

import com.tasueom.inventory_manager.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByNameContaining(String name);
}
