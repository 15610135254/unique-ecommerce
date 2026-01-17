package com.unique.controller;

import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.CategoryResponse;
import com.unique.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAllCategories() {
        return ApiResponse.success(categoryService.getAllCategories());
    }

    @GetMapping("/top")
    public ApiResponse<List<CategoryResponse>> getTopCategories() {
        return ApiResponse.success(categoryService.getTopCategories());
    }
}
