import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const findProduct = () => {
            const found = productsData.find(p => p.id === parseInt(id));
            setProduct(found);
            setLoading(false);
        };
        findProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        // Kiểm tra đã đăng nhập chưa
        const username = localStorage.getItem('username');
        if (!username) {
            alert('Vui lòng đăng nhập để thực hiện mua hàng!');
            navigate('/login');
            return;
        }

        addToCart(product);
        alert(`🎯 Đã thêm "${product.name}" vào giỏ hàng của bạn!`);
    };

    const handleBuyNow = () => {
        // Kiểm tra đã đăng nhập chưa
        const username = localStorage.getItem('username');
        if (!username) {
            alert('Vui lòng đăng nhập để thực hiện mua hàng!');
            navigate('/login');
            return;
        }

        addToCart(product);
        navigate('/cart');
    };

    if (loading) return (
      <div className="pd-loading">
        <div className="spinner"></div>
      </div>
    );
    
    if (!product) return (
        <div className="pd-error-container">
            <div className="pd-error-icon">⚠️</div>
            <h2>Ối! Không tìm thấy sản phẩm này</h2>
            <p>Có thể sản phẩm đã bị gỡ bỏ hoặc ID không đúng.</p>
            <button className="pd-error-btn" onClick={() => navigate('/')}>Quay về Trang chủ</button>
        </div>
    );

    return (
        <div className="pd-wrapper">
          <div className="pd-container">
              <nav className="pd-breadcrumb">
                  <button className="pd-back-link" onClick={() => navigate(-1)}>
                     &#8592; Quay lại
                  </button>
                  <span className="breadcrumb-divider">/</span>
                  <span className="breadcrumb-current">{product.name}</span>
              </nav>

              <div className="pd-layout">
                  <div className="pd-media">
                      <div className="pd-image-box">
                          <img 
                             src={product.image || product.imageUrl} 
                             alt={product.name} 
                             className="pd-main-img"
                             onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=No+Image'; }}
                          />
                      </div>
                  </div>
                  
                  <div className="pd-info">
                      <div className="pd-header-info">
                          <h1 className="pd-name">{product.name}</h1>
                          <div className="pd-price-badge">
                              <span className="pd-price-label">Giá niêm yết:</span>
                              <span className="pd-current-price">{product.price?.toLocaleString()} ₫</span>
                          </div>
                      </div>

                      <div className="pd-section">
                          <h3 className="section-title">✨ Thông số nổi bật</h3>
                          <ul className="pd-specs-list">
                              <li><strong>Thương hiệu:</strong> {product.specs?.brand || 'Apple'}</li>
                              <li><strong>Màn hình:</strong> {product.specs?.display || 'Super Retina XDR OLED'}</li>
                              <li><strong>Chip xử lý:</strong> {product.specs?.chip || 'A18 Pro'}</li>
                              <li><strong>RAM/ROM:</strong> {product.specs?.ram || '8GB'} / {product.specs?.storage || '256GB'}</li>
                              <li><strong>Pin:</strong> {product.specs?.battery || '5000 mAh'}</li>
                          </ul>
                      </div>

                      <div className="pd-section">
                          <h3 className="section-title">📝 Mô tả sản phẩm</h3>
                          <p className="pd-desc-text">{product.description || 'Sản phẩm công nghệ cao cấp chính hãng.'}</p>
                      </div>

                      <div className="pd-cta">
                          <button className="btn-buy-now" onClick={handleBuyNow}>
                              <span className="btn-label">MUA NGAY</span>
                              <span className="btn-subtext">Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng</span>
                          </button>
                          <button className="btn-add-to-cart-outline" onClick={handleAddToCart}>
                              <span>Thêm giỏ hàng</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    );
};

export default ProductDetail;