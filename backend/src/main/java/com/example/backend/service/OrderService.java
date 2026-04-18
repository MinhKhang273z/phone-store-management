package com.example.backend.service;

import com.example.backend.entity.CartItem;
import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.UserRepository;
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
    
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Order createOrder(Long userId) {
        System.out.println(">>> START: createOrder for userId: " + userId);
        
        try {
            // 1. Lấy tất cả cartItem theo userId
            List<CartItem> cartItems = cartService.getCartByUserId(userId);
            System.out.println(">>> [1/4] Cart size: " + cartItems.size());
            
            if (cartItems.isEmpty()) {
                throw new RuntimeException("Giỏ hàng trống, không thể đặt hàng!");
            }

            // 2. Tính tổng tiền
            double totalPrice = cartItems.stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();
            
            // 3. Lấy thông tin người mua
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

            // 4. Lưu Order
            Order order = new Order();
            order.setUserId(userId);
            order.setCustomerName(user.getUsername()); // Dùng Username làm tên người mua
            order.setTotalPrice(totalPrice);
            order.setCreatedAt(LocalDateTime.now());
            order.setStatus("PENDING"); 
            
            Order savedOrder = orderRepository.save(order);
            System.out.println(">>> [3/4] Order Saved (ID: " + savedOrder.getId() + ", Customer: " + savedOrder.getCustomerName() + ")");

            // 5. Xóa cart
            cartService.clearCart(userId);
            System.out.println(">>> [4/4] Cart Cleared.");

            System.out.println("<<< END: createOrder Success");
            return savedOrder;
        } catch (RuntimeException re) {
            System.err.println(">>> BUSINESS ERROR: " + re.getMessage());
            throw re;
        } catch (Exception e) {
            System.err.println(">>> SYSTEM ERROR: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Lỗi hệ thống khi tạo đơn hàng: " + e.getMessage());
        }
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
