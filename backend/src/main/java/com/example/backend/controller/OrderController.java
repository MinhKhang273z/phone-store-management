package com.example.backend.controller;

import com.example.backend.entity.Order;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // API cho User đặt hàng
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Map<String, Object> payload) {
        System.out.println("API Called: POST /api/order - Payload: " + payload);
        
        Object userIdObj = payload.get("userId");
        if (userIdObj == null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            // Chuyển đổi userId sang Long dù nó là String hay Integer/Long
            Long userId = Long.valueOf(userIdObj.toString());
            return ResponseEntity.ok(orderService.createOrder(userId));
        } catch (NumberFormatException e) {
            System.err.println("Invalid userId format: " + userIdObj);
            return ResponseEntity.badRequest().build();
        }
    }

    // API cho Admin lấy toàn bộ đơn hàng
    @GetMapping
    public List<Order> getAllOrders() {
        System.out.println("API Called: GET /api/order (Admin)");
        return orderService.getAllOrders();
    }

    // API cho Admin cập nhật trạng thái đơn hàng
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    // API cho User lấy đơn hàng của mình
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }
}
