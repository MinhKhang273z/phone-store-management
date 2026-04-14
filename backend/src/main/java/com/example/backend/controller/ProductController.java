package com.example.backend.controller;

import com.example.backend.entity.Product;
import com.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*") // Để Frontend gọi được vào đây
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAll() { return productService.getAll(); }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) { return productService.getById(id); }

    @PostMapping
    public Product create(@RequestBody Product p) { return productService.save(p); }
}