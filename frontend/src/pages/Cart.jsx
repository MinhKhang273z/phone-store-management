import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrderApi } from '../services/api';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert("Vui lòng đăng nhập để đặt hàng!");
            navigate('/login');
            return;
        }

        if (confirm("Xác nhận đặt hàng?")) {
            setLoading(true);
            try {
                await createOrderApi(userId);
                alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
                clearCart();
                navigate('/');
            } catch (error) {
                alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty-container">
                <div className="cart-empty-icon">🛍️</div>
                <h2>Giỏ hàng đang trống</h2>
                <p>Khám phá các sản phẩm công nghệ đỉnh cao ngay thôi!</p>
                <button className="cart-back-home" onClick={() => navigate('/')}>
                    Khám phá ngay
                </button>
            </div>
        );
    }

    return (
        <div className="cart-page-wrapper">
            <div className="cart-container">
                <header className="cart-header">
                    <h1 className="cart-title">Giỏ hàng</h1>
                    <span className="cart-count">{totalItems} sản phẩm</span>
                </header>
                
                <div className="cart-layout">
                    {/* Danh sách sản phẩm */}
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <div className="cart-item-image">
                                    <img 
                                        src={item.image || `https://via.placeholder.com/150?text=${item.name}`} 
                                        alt={item.name} 
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No+Image'; }}
                                    />
                                </div>
                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">{item.price?.toLocaleString()} ₫</p>
                                    
                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                            <i className="fas fa-trash"></i> Xóa
                                        </button>
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
                        <div className="summary-card glass">
                            <h3>Tổng kết đơn hàng</h3>
                            <div className="summary-row">
                                <span>Tạm tính</span>
                                <span>{totalPrice.toLocaleString()} ₫</span>
                            </div>
                            <div className="summary-row">
                                <span>Phí vận chuyển</span>
                                <span className="free-shipping">Miễn phí</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Tổng cộng</span>
                                <span className="total-price">{totalPrice.toLocaleString()} ₫</span>
                            </div>
                            <button 
                                className={`checkout-btn ${loading ? 'loading' : ''}`} 
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG NGAY'}
                            </button>
                            <Link to="/" className="continue-shopping">← Tiếp tục mua sắm</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
