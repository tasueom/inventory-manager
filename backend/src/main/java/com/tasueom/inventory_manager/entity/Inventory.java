package com.tasueom.inventory_manager.entity;

import com.tasueom.inventory_manager.dto.InventoryRequestDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int unitPrice;

    private int quantity;

    public void updateFrom(InventoryRequestDto dto) {
        this.name = dto.getName();
        this.unitPrice = dto.getUnitPrice();
        this.quantity = dto.getQuantity();
    }
}
