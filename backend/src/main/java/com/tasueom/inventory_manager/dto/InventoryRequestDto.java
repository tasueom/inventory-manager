package com.tasueom.inventory_manager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryRequestDto {

    private String name;
    private int unitPrice;
    private int quantity;
}
