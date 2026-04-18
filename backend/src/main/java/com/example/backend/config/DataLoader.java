package com.example.backend.config;

import com.example.backend.entity.User;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository, UserRepository userRepository) {
        return args -> {
            // Khởi tạo hoặc cập nhật tài khoản ADMIN
            Optional<User> adminOptional = userRepository.findByUsername("admin");
            User admin;
            if (adminOptional.isPresent()) {
                admin = adminOptional.get();
                System.out.println("--- Tài khoản ADMIN đã tồn tại, đang cập nhật thông tin ---");
            } else {
                admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                System.out.println("--- Đang tạo tài khoản ADMIN mới ---");
            }
            
            admin.setPassword("123456"); // Cập nhật mật khẩu đúng yêu cầu
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("--- Đã thiết lập tài khoản ADMIN: admin / 123456 ---");

            System.out.println("--- Dữ liệu đang được lấy trực tiếp từ ProductService (Hardcoded) ---");
        };
    }
}