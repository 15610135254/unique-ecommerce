package com.unique.service;

import com.unique.dto.response.CartResponse;
import com.unique.entity.CartItem;
import com.unique.entity.Product;
import com.unique.entity.User;
import com.unique.exception.BusinessException;
import com.unique.repository.CartItemRepository;
import com.unique.repository.ProductRepository;
import com.unique.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Long.parseLong(principal.toString());
    }

    public List<CartResponse> getCartItems() {
        Long userId = getCurrentUserId();
        return cartItemRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public CartResponse addToCart(Long productId, Integer quantity) {
        Long userId = getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("用户不存在"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException("商品不存在"));

        if (product.getStockQuantity() < quantity) {
            throw new BusinessException("库存不足");
        }

        CartItem existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem = cartItemRepository.save(existingItem);
            return toResponse(existingItem);
        }

        CartItem cartItem = CartItem.builder()
                .user(user)
                .product(product)
                .quantity(quantity)
                .build();

        cartItem = cartItemRepository.save(cartItem);
        return toResponse(cartItem);
    }

    @Transactional
    public CartResponse updateCartItem(Long productId, Integer quantity) {
        Long userId = getCurrentUserId();
        if (quantity <= 0) {
            removeFromCart(productId);
            return null;
        }
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new BusinessException("购物车中没有该商品"));
        cartItem.setQuantity(quantity);
        cartItem = cartItemRepository.save(cartItem);
        return toResponse(cartItem);
    }

    @Transactional
    public void removeFromCart(Long productId) {
        Long userId = getCurrentUserId();
        cartItemRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional
    public void clearCart() {
        Long userId = getCurrentUserId();
        cartItemRepository.deleteByUserId(userId);
    }

    public int getCartCount() {
        Long userId = getCurrentUserId();
        List<CartItem> items = cartItemRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return items.stream().mapToInt(CartItem::getQuantity).sum();
    }

    private CartResponse toResponse(CartItem item) {
        Product product = item.getProduct();
        BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        return CartResponse.builder()
                .id(item.getId())
                .productId(product.getId())
                .productName(product.getName())
                .productImage(product.getImage())
                .price(product.getPrice())
                .quantity(item.getQuantity())
                .subtotal(subtotal)
                .build();
    }
}
