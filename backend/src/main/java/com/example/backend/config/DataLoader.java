package com.example.backend.config;

import com.example.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;

// @Configuration
public class DataLoader {

     // @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            /* Logic cũ đã vô hiệu hóa để chuyển sang dữ liệu hardcoded trong Service
            repository.deleteAll();
            ...
            */
            System.out.println("--- Dữ liệu đang được lấy trực tiếp từ ProductService (Hardcoded) ---");
        };
    }
}