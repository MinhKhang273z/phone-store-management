import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { resolveProductImage } from '../utils/imageResolver';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // Kiểm tra đã đăng nhập chưa
    const username = localStorage.getItem('username');
    if (!username) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/login');
      return;
    }

    addToCart(product);
    // Hiệu ứng nhẹ hoặc thông báo cho người dùng
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetail}>
      <div className="product-image-container">
        <img 
          src={resolveProductImage(product.image)} 
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