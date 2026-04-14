package com.example.backend.service;

import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAll() { return productRepository.findAll(); }
    public Product getById(Long id) { return productRepository.findById(id).orElse(null); }
    public Product save(Product p) { return productRepository.save(p); }
    public void delete(Long id) { productRepository.deleteById(id); }
}