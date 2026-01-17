package com.unique.controller;

import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.CartResponse;
import com.unique.service.CartService;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ApiResponse<List<CartResponse>> getCartItems() {
        return ApiResponse.success(cartService.getCartItems());
    }

    @PostMapping("/add")
    public ApiResponse<CartResponse> addToCart(
            @RequestParam @NotNull Long productId,
            @RequestParam(defaultValue = "1") @Min(1) Integer quantity) {
        return ApiResponse.success("已添加到购物车", cartService.addToCart(productId, quantity));
    }

    @PutMapping("/update")
    public ApiResponse<CartResponse> updateCartItem(
            @RequestParam @NotNull Long productId,
            @RequestParam @NotNull Integer quantity) {
        CartResponse response = cartService.updateCartItem(productId, quantity);
        return ApiResponse.success("购物车已更新", response);
    }

    @DeleteMapping("/remove")
    public ApiResponse<Map<String, String>> removeFromCart(@RequestParam @NotNull Long productId) {
        cartService.removeFromCart(productId);
        return ApiResponse.success("商品已移除", Map.of("message", "商品已移除"));
    }

    @DeleteMapping("/clear")
    public ApiResponse<Map<String, String>> clearCart() {
        cartService.clearCart();
        return ApiResponse.success("购物车已清空", Map.of("message", "购物车已清空"));
    }

    @GetMapping("/count")
    public ApiResponse<Map<String, Integer>> getCartCount() {
        return ApiResponse.success(Map.of("count", cartService.getCartCount()));
    }
}
