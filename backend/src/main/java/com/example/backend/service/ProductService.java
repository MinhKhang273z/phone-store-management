package com.example.backend.service;

import com.example.backend.entity.Product;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    private final List<Product> products = new ArrayList<>();

    public ProductService() {
        // Khởi tạo dữ liệu mẫu hardcoded khớp với tên ảnh trong thư mục /phone
        products.add(new Product(1L, "iPhone 16 Pro Max", "/phone/iphone-16-pro-max.jpg", 34990000.0, "256GB", "Titan Sa Mạc", 
            Arrays.asList("Màn hình 6.9 inch", "Chip A18 Pro", "Camera 48MP", "Pin 4685mAh")));
        
        products.add(new Product(2L, "iPhone 15 Plus", "/phone/iphone-15-plus-128gb.jpg", 22990000.0, "128GB", "Hồng", 
            Arrays.asList("Màn hình 6.7 inch", "Chip A16 Bionic", "Camera 48MP", "Cổng USB-C")));
        
        products.add(new Product(3L, "Samsung Galaxy S24 Ultra", "/phone/samsung-galaxy-s26-ultra-12gb-256gb.jpg", 29990000.0, "256GB", "Xám Titan", 
            Arrays.asList("Màn hình 6.8 inch", "Snapdragon 8 Gen 3", "Camera 200MP", "Bút S-Pen")));
            
        products.add(new Product(4L, "OPPO Find N3 Flip", "/phone/oppo-find-n3-flip.jpg", 19990000.0, "256GB", "Vàng", 
            Arrays.asList("Màn hình gập", "Chip Dimensity 9200", "Camera Hasselblad", "Sạc nhanh 44W")));
            
        products.add(new Product(5L, "Xiaomi 14 Ultra", "/phone/xiaomi-17-ultra.jpg", 28990000.0, "512GB", "Trắng", 
            Arrays.asList("Ống kính Leica", "Snapdragon 8 Gen 3", "Màn hình 2K+", "Pin 5000mAh")));
            
        products.add(new Product(6L, "Realme 12 Pro+", "/phone/realme-16-pro-5g-256gb.jpg", 11490000.0, "256GB", "Xanh", 
            Arrays.asList("Camera Periscope", "Chip Snapdragon 7s Gen 2", "Màn hình cong 120Hz")));
            
        products.add(new Product(7L, "Vivo V30e", "/phone/vivo-v30e-nau.jpg", 9490000.0, "128GB", "Nâu", 
            Arrays.asList("Chip Snapdragon 6 Gen 1", "Pin 5500mAh", "Camera 50MP", "Màn hình AMOLED")));
            
        products.add(new Product(8L, "Nokia 220 4G", "/phone/nokia-220-4g.jpg", 990000.0, "Standard", "Đen", 
            Arrays.asList("Hỗ trợ 4G VoLTE", "Pin trâu", "Nghe đài FM không dây", "Bàn phím T9")));
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public Product getProductById(Long id) {
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}