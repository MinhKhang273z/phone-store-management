import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty-container">
                <div className="cart-empty-icon">🛒</div>
                <h2>Giỏ hàng của bạn đang trống</h2>
                <p>Hãy chọn cho mình những sản phẩm công nghệ tuyệt vời nhất nhé!</p>
                <button className="cart-back-home" onClick={() => navigate('/')}>
                    Quay lại mua sắm ngay
                </button>
            </div>
        );
    }

    return (
        <div className="cart-page-wrapper">
            <div className="cart-container">
                <h1 className="cart-title">Giỏ hàng ({totalItems})</h1>
                
                <div className="cart-layout">
                    {/* Danh sách sản phẩm */}
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <div className="cart-item-image">
                                    <img 
                                        src={item.image || item.imageUrl} 
                                        alt={item.name} 
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No+Image'; }}
                                    />
                                </div>
                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">{item.price?.toLocaleString()} ₫</p>
                                    
                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Xóa</button>
                                    </div>
                                </div>
                                <div className="cart-item-total">
                                    {(item.price * item.quantity).toLocaleString()} ₫
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tổng kết đơn hàng */}
                    <div className="cart-summary">
                        <div className="summary-card">
                            <h3>Tổng kết đơn hàng</h3>
                            <div className="summary-row">
                                <span>Tạm tính:</span>
                                <span>{totalPrice.toLocaleString()} ₫</span>
                            </div>
                            <div className="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span className="free-shipping">Miễn phí</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Tổng cộng:</span>
                                <span className="total-price">{totalPrice.toLocaleString()} ₫</span>
                            </div>
                            <button className="checkout-btn" onClick={() => alert('Chức năng thanh toán đang được phát triển!')}>
                                TIẾN HÀNH THANH TOÁN
                            </button>
                            <Link to="/" className="continue-shopping">Tiếp tục mua sắm</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
