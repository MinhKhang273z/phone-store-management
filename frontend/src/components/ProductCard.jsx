import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    alert(`🛒 Đã thêm "${product.name}" vào giỏ hàng thành công!`);
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetail}>
      <div className="product-image-container">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/200x250?text=No+Image'; }}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price?.toLocaleString()} ₫</p>
      </div>

      <div className="product-actions">
        <button className="btn-add-cart" onClick={handleAddToCart}>
          <span>Giỏ hàng</span>
        </button>
        <button className="btn-detail" onClick={handleViewDetail}>
          <span>Chi tiết</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;