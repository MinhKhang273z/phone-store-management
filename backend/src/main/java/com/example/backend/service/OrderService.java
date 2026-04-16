package com.example.backend.service;

import com.example.backend.entity.CartItem;
import com.example.backend.entity.Order;
import com.example.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Transactional
    public Order createOrder(Long userId) {
        // 1. Lấy tất cả cartItem theo userId
        List<CartItem> cartItems = cartService.getCartByUserId(userId);
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Giỏ hàng trống, không thể đặt hàng!");
        }

        // 2. Tính tổng tiền
        double totalPrice = cartItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        // 3. Lưu Order
        Order order = new Order();
        order.setUserId(userId);
        order.setTotalPrice(totalPrice);
        order.setCreatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);

        // 4. Xóa cart
        cartService.clearCart(userId);

        return savedOrder;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
