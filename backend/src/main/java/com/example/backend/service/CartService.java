package com.example.backend.service;

import com.example.backend.entity.CartItem;
import com.example.backend.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartItem> getCartByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public CartItem addToCart(CartItem item) {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user chưa
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductName(item.getUserId(), item.getProductName());

        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + item.getQuantity());
            // Preserve existing imageUrl
            return cartItemRepository.save(cartItem);
        } else {
            // New items will save imageUrl from 'item'
            return cartItemRepository.save(item);
        }
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
