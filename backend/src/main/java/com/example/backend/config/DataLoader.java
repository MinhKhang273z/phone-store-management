package com.example.backend.config;

import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
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
                System.out.println("--- Tài khoản ADMIN đã tồn tại ---");
            } else {
                admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                System.out.println("--- Đang tạo tài khoản ADMIN mới ---");
            }
            
            admin.setPassword("123456"); 
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("--- Đã thiết lập tài khoản ADMIN: admin / 123456 ---");

            // Khởi tạo dữ liệu sản phẩm nếu bảng trống
            if (productRepository.count() == 0) {
                System.out.println("--- Đang khởi tạo dữ liệu sản phẩm mẫu vào Database ---");
                productRepository.save(new Product(null, "iPhone 16 Pro Max", "/phone/iphone-16-pro-max.jpg", 34990000.0, "256GB", "Titan Sa Mạc", 
                    Arrays.asList("Màn hình 6.9 inch", "Chip A18 Pro", "Camera 48MP", "Pin 4685mAh"), "Siêu phẩm Apple năm 2024 với màn hình cực lớn và chip A18 Pro mạnh mẽ."));
                
                productRepository.save(new Product(null, "iPhone 15 Plus", "/phone/iphone-15-plus-128gb.jpg", 22990000.0, "128GB", "Hồng", 
                    Arrays.asList("Màn hình 6.7 inch", "Chip A16 Bionic", "Camera 48MP", "Cổng USB-C"), "iPhone màn hình lớn, pin cực trâu với mức giá hợp lý."));
                
                productRepository.save(new Product(null, "Samsung Galaxy S24 Ultra", "/phone/samsung-galaxy-s26-ultra-12gb-256gb.jpg", 29990000.0, "256GB", "Xám Titan", 
                    Arrays.asList("Màn hình 6.8 inch", "Snapdragon 8 Gen 3", "Camera 200MP", "Bút S-Pen"), "Flagship cao cấp nhất của Samsung với camera zoom 100x và bút S-Pen tiện lợi."));
                    
                productRepository.save(new Product(null, "OPPO Find N3 Flip", "/phone/oppo-find-n3-flip.jpg", 19990000.0, "256GB", "Vàng", 
                    Arrays.asList("Màn hình gập", "Chip Dimensity 9200", "Camera Hasselblad", "Sạc nhanh 44W"), "Điện thoại gập thời trang với camera chuyên nghiệp từ Hasselblad."));
                
                System.out.println("--- Đã khởi tạo xong dữ liệu sản phẩm ---");
            }
        };
    }
}