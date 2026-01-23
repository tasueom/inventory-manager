package com.tasueom.inventory_manager.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    public void decreaseQuantity(int amount) {
        if (amount < 1) throw new IllegalArgumentException("구매 수량은 1 이상이어야 합니다.");
        if (this.quantity < amount) throw new IllegalArgumentException("재고가 부족합니다.");
        this.quantity -= amount;
    }



    private void validate(int unitPrice, int quantity){
        if (unitPrice < 1 ) throw new IllegalArgumentException("단가는 1 이상이어야합니다.");

        if (quantity < 0 ) throw new IllegalArgumentException("수량은 0 이상이어야합니다.");
    }
}
