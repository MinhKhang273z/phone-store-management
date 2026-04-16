import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCartApi, deleteCartItemApi } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    // Tải giỏ hàng khi khởi tạo hoặc khi userId thay đổi
    useEffect(() => {
        const fetchCart = async () => {
            if (userId) {
                try {
                    const data = await getCart(userId);
                    // Map backend data (productName) to frontend format (name) if necessary
                    const formattedData = data.map(item => ({
                        ...item,
                        id: item.id, // backend id of CartItem
                        name: item.productName,
                        price: item.price,
                        quantity: item.quantity
                    }));
                    setCartItems(formattedData);
                } catch (error) {
                    console.error("Không thể tải giỏ hàng từ server", error);
                }
            } else {
                // Nếu không đăng nhập, dùng localStorage (tùy chọn)
                const savedCart = localStorage.getItem('cart');
                setCartItems(savedCart ? JSON.parse(savedCart) : []);
            }
        };

        fetchCart();
    }, [userId]);

    // Đồng bộ localStorage khi không đăng nhập
    useEffect(() => {
        if (!userId) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, userId]);

    const addToCart = async (product) => {
        if (userId) {
            try {
                const itemData = {
                    userId: parseInt(userId),
                    productName: product.name,
                    price: product.price,
                    quantity: 1
                };
                await addToCartApi(itemData);
                // Refresh cart from server to get accurate state
                const data = await getCart(userId);
                setCartItems(data.map(item => ({
                    ...item,
                    name: item.productName
                })));
            } catch (error) {
                console.error("Lỗi thêm vào giỏ hàng server:", error);
            }
        } else {
            // Logic local cho guest
            setCartItems(prevItems => {
                const existingItem = prevItems.find(item => item.name === product.name);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...prevItems, { ...product, quantity: 1 }];
            });
        }
    };

    const removeFromCart = async (cartItemId) => {
        if (userId) {
            try {
                await deleteCartItemApi(cartItemId);
                setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
            } catch (error) {
                console.error("Lỗi xóa khỏi giỏ hàng server:", error);
            }
        } else {
            setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
        }
    };

    const updateQuantity = async (cartItemId, quantity) => {
        if (quantity < 1) return;
        
        // Hiện tại backend chưa có API updateQuantity riêng, 
        // nhưng ta có thể dùng addToCart với logic update hoặc gọi lại API.
        // Để đơn giản, ta update local state trước và có thể gọi API sau nếu cần.
        // Trong yêu cầu của User không bắt buộc update quantity qua API riêng, 
        // nhưng để chuẩn nhất nên có. Ở đây ta làm logic đơn giản.
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === cartItemId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        if (!userId) localStorage.removeItem('cart');
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            totalItems,
            totalPrice,
            setUserId // Để cập nhật khi login/logout
        }}>
            {children}
        </CartContext.Provider>
    );
};
