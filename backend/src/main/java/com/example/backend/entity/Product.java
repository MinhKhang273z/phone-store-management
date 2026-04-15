package com.example.backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String image; // Khớp với "image" thay vì "imageUrl"
    private double price;
    private String version;
    private String color;

    @ElementCollection
    @CollectionTable(name = "product_specifications", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "specification")
    private List<String> specifications;

    public Product() {}

    public Product(Long id, String name, String image, double price, String version, String color, List<String> specifications) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.version = version;
        this.color = color;
        this.specifications = specifications;
    }

    // Getter và Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public List<String> getSpecifications() { return specifications; }
    public void setSpecifications(List<String> specifications) { this.specifications = specifications; }
}