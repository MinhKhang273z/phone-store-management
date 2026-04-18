package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.CartItemRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void deleteUser(Long id) {
        System.out.println(">>> START: deleting user with id: " + id);
        try {
            // 1. Xóa các sản phẩm trong giỏ hàng của user này trước (Ràng buộc FK)
            cartItemRepository.deleteByUserId(id);
            System.out.println(">>> [1/3] Deleted cart items for user: " + id);

            // 2. Xóa các đơn hàng của user này (Ràng buộc FK)
            orderRepository.deleteByUserId(id);
            System.out.println(">>> [2/3] Deleted orders for user: " + id);

            // 3. Xóa bản thân user
            userRepository.deleteById(id);
            System.out.println(">>> [3/3] Deleted user: " + id);
            
            System.out.println("<<< END: deleteUser Success");
        } catch (Exception e) {
            System.err.println(">>> ERROR deleting user: " + e.getMessage());
            throw new RuntimeException("Không thể xóa người dùng vì có dữ liệu liên quan hoặc lỗi hệ thống: " + e.getMessage());
        }
    }

    public User registerUser(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password); // Note: Should be hashed in a real application
        user.setRole("USER");

        return userRepository.save(user);
    }

    public Optional<User> authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Validate password securely (plain text comparison used here for educational purposes)
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}
