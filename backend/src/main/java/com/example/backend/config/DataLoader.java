package com.example.backend.config;

import com.example.backend.entity.Product; 
import com.example.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            repository.deleteAll();

            System.out.println("--- Đang nạp 10 sản phẩm (Link ảnh mới) ---");

           // ... 3 máy đầu tiên vẫn đang hiển thị bình thường thì cứ giữ nguyên link cũ ...
            repository.save(new Product(null, "iPhone 15 Pro", "Titan tự nhiên", 28990000.0, "https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-blue-1.jpg"));
            repository.save(new Product(null, "iPhone 13", "Thiết kế bền bỉ", 13590000.0, "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1.jpg"));
            repository.save(new Product(null, "Samsung Galaxy S24 Ultra", "Siêu phẩm AI 2024", 29990000.0, "https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-xam-1.jpg"));

            // 7 máy sau: Sử dụng ảnh nội bộ từ thư mục public/images/ của Frontend
            repository.save(new Product(null, "Oppo Reno11 F 5G", "Chuyên gia chân dung AI", 8990000.0, "/images/oppo.jpg"));
            repository.save(new Product(null, "Xiaomi 14", "Ống kính Leica cao cấp", 18990000.0, "/images/xiaomi.jpg"));
            repository.save(new Product(null, "Vivo V30 5G", "Thiết kế mỏng nhẹ", 13990000.0, "/images/vivo.jpg"));
            
            repository.save(new Product(null, "MacBook Air M3", "Siêu mỏng nhẹ", 27990000.0, "/images/macbook.jpg"));
            repository.save(new Product(null, "Laptop ASUS Vivobook", "Màn hình OLED", 14990000.0, "/images/asus.jpg"));
            repository.save(new Product(null, "Laptop HP Pavilion", "Vỏ nhôm sang trọng", 16490000.0, "/images/hp.jpg"));
            repository.save(new Product(null, "Laptop Acer Swift Go", "Gọn nhẹ văn phòng", 17990000.0, "/images/acer.jpg"));

            repository.save(new Product(null, "Google Pixel 8 Pro", "Chụp ảnh đỉnh cao", 22500000.0, "/images/pixel8.jpg"));
            repository.save(new Product(null, "Realme 12 Pro+", "Thiết kế đồng hồ hạng sang", 11490000.0, "/images/realme12.jpg"));
            repository.save(new Product(null, "Sony Xperia 1 V", "Màn hình 4K HDR", 25990000.0, "/images/xperia1v.jpg"));
            repository.save(new Product(null, "Asus ROG Phone 8", "Chiến thần Gaming", 24990000.0, "/images/rogphone8.jpg"));
            repository.save(new Product(null, "iPhone 15 Plus", "Màn hình lớn, pin cực trâu", 22990000.0, "/images/iphone15plus.jpg"));
            repository.save(new Product(null, "Samsung Galaxy A55", "Kháng nước, kháng bụi IP67", 9690000.0, "/images/samsunga55.jpg"));
            repository.save(new Product(null, "Xiaomi Redmi Note 13", "Màn hình 120Hz siêu mượt", 4890000.0, "/images/redmi13.jpg"));
            repository.save(new Product(null, "Laptop HP Pavilion", "Vỏ nhôm sang trọng", 16490000.0, "/images/hppavilion.jpg"));
            repository.save(new Product(null, "Laptop Acer Swift Go", "Gọn nhẹ văn phòng", 17990000.0, "/images/acerswift.jpg"));
            repository.save(new Product(null, "Dell XPS 13", "Đẳng cấp doanh nhân", 35000000.0, "/images/dellxps13.jpg"));
            repository.save(new Product(null, "Lenovo Legion 5", "Laptop Gaming quốc dân", 26500000.0, "/images/lenovolegion.jpg"));
            repository.save(new Product(null, "MSI Katana 15", "Hiệu năng cực đỉnh", 21990000.0, "/images/msikatana.jpg"));
            
            repository.save(new Product(null, "iPad Pro M4", "Siêu mỏng, màn hình OLED", 28490000.0, "/images/ipadprom4.jpg"));
            repository.save(new Product(null, "iPad Air M2", "Đa năng cho học tập", 16490000.0, "/images/ipadairm2.jpg"));
            repository.save(new Product(null, "Samsung Galaxy Tab S9", "S Pen kèm máy tiện lợi", 17990000.0, "/images/tabs9.jpg"));
            repository.save(new Product(null, "Xiaomi Pad 6", "Giá rẻ hiệu năng cao", 8500000.0, "/images/xiaomipad6.jpg"));
            
            System.out.println("--- Đã cập nhật xong link ảnh mới! ---");
        };
    }
}