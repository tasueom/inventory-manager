package com.tasueom.inventory_manager.repository;

import com.tasueom.inventory_manager.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
