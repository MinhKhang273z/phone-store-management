package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    
    // Mới thêm để hiển thị tên người mua ở Admin Dashboard
    @Column(name = "customer_name")
    private String customerName;
    
    private double totalPrice;
    private LocalDateTime createdAt;
    
    private String status = "PENDING"; 

    public Order() {}

    public Order(Long id, Long userId, String customerName, double totalPrice, LocalDateTime createdAt, String status) {
        this.id = id;
        this.userId = userId;
        this.customerName = customerName;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
