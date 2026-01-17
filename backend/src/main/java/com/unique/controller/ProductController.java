package com.unique.controller;

import com.unique.dto.request.ProductFilterRequest;
import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.ProductResponse;
import com.unique.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getProduct(@PathVariable Long id) {
        return ApiResponse.success(productService.getProductById(id));
    }

    @GetMapping("/new")
    public ApiResponse<List<ProductResponse>> getNewProducts() {
        return ApiResponse.success(productService.getNewProducts());
    }

    @GetMapping
    public ApiResponse<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.success(productService.getAllProducts(page, size));
    }

    @PostMapping("/filter")
    public ApiResponse<Page<ProductResponse>> filterProducts(@RequestBody ProductFilterRequest request) {
        return ApiResponse.success(productService.filterProducts(request));
    }

    @GetMapping("/creator/{creatorId}")
    public ApiResponse<List<ProductResponse>> getProductsByCreator(@PathVariable Long creatorId) {
        return ApiResponse.success(productService.getProductsByCreator(creatorId));
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<ProductResponse>> getProductsByCategory(@PathVariable Long categoryId) {
        return ApiResponse.success(productService.getProductsByCategory(categoryId));
    }
}
