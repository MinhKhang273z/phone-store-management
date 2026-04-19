package com.example.backend.controller;

import com.example.backend.entity.Product;
import com.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        System.out.println("API Called: GET /api/products");
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        System.out.println("API Called: POST /api/products");
        return productService.saveProduct(product);
    }

    @PostMapping("/bulk")
    public List<Product> createProductsBulk(@RequestBody List<Product> products) {
        System.out.println("API Called: POST /api/products/bulk - Count: " + products.size());
        return productService.saveAllProducts(products);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        
        product.setName(productDetails.getName());
        product.setImage(productDetails.getImage());
        product.setPrice(productDetails.getPrice());
        product.setVersion(productDetails.getVersion());
        product.setColor(productDetails.getColor());
        product.setQuantity(productDetails.getQuantity()); // Cập nhật số lượng
        product.setDescription(productDetails.getDescription()); // Cập nhật mô tả
        product.setSpecifications(productDetails.getSpecifications());
        
        Product updatedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        System.out.println("API Called: DELETE /api/products/" + id);
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}