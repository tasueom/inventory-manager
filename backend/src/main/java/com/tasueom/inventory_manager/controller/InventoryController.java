package com.tasueom.inventory_manager.controller;

import com.tasueom.inventory_manager.dto.InventoryRequestDto;
import com.tasueom.inventory_manager.dto.InventoryResponseDto;
import com.tasueom.inventory_manager.service.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<InventoryResponseDto> getAll() {
        return service.getInventoryList();
    }

    @GetMapping("/{id}")
    public InventoryResponseDto getOne(@PathVariable long id) {
        return service.getInventory(id);
    }

    @PostMapping
    public InventoryResponseDto create(@RequestBody InventoryRequestDto dto) {
        return service.createInventory(dto);
    }

    @PutMapping("/{id}")
    public InventoryResponseDto update(@PathVariable long id, @RequestBody InventoryRequestDto dto) {
        return service.updateInventory(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        service.deleteInventory(id);
    }

}
