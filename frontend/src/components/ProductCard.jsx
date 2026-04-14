import React from 'react';
import { Link } from 'react-router-dom'; // Thêm Link để chuyển trang
import './ProductCard.css';

// Component nhận vào thông tin một điện thoại (product)
const ProductCard = ({ product }) => {
  return (
    /* Dùng Link bao bọc để click vào card sẽ nhảy sang trang Detail */
    <Link to={`/product/${product.id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        {/* Hình ảnh sản phẩm */}
        <div className="product-image-container">
  <img 
    src={product.imageUrl} 
    alt={product.name} 
    className="product-image"
    style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
    onError={(e) => { e.target.src = 'https://via.placeholder.com/200x250?text=No+Image'; }}
  />
</div>
        
        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h3 className="product-name">
            {product.name}
          </h3>
          <p className="product-price">
            {/* format tiền cho đẹp, ví dụ: 28,000,000 VNĐ */}
            {product.price?.toLocaleString()} VNĐ
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;