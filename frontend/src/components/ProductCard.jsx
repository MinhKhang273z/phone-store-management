import React from 'react';
import './ProductCard.css';

// Component nhận vào thông tin một điện thoại (product)
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Hình ảnh sản phẩm */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
      </div>
      
      {/* Thông tin sản phẩm */}
      <div className="product-info">
        <h3 className="product-name">
          {product.name}
        </h3>
        <p className="product-price">
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
