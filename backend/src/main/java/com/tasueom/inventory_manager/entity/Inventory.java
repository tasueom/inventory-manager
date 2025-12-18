package com.tasueom.inventory_manager.entity;

import com.tasueom.inventory_manager.dto.InventoryRequestDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int unitPrice;

    private int quantity;

    public Inventory(String name, int unitPrice, int quantity) {
        validate(unitPrice, quantity);
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    public void update(String name, int unitPrice, int quantity) {
        validate(unitPrice, quantity);
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }


    private void validate(int unitPrice, int quantity){
        if (unitPrice < 1 ) throw new IllegalArgumentException("단가는 1 이상이어야합니다.");

        if (quantity < 0 ) throw new IllegalArgumentException("수량은 0 이상이어야합니다.");
    }
}
