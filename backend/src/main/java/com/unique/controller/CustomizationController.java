package com.unique.controller;

import com.unique.dto.request.CreateCustomizationRequest;
import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.CustomizationResponse;
import com.unique.entity.CustomizationRequest;
import com.unique.service.CustomizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customization")
@RequiredArgsConstructor
public class CustomizationController {

    private final CustomizationService customizationService;

    // 创建定制请求（不需要登录，但登录用户会关联到账号）
    @PostMapping("/request")
    public ApiResponse<CustomizationResponse> createRequest(@Valid @RequestBody CreateCustomizationRequest request) {
        CustomizationResponse response = customizationService.createRequest(request);
        return ApiResponse.success("定制请求已提交", response);
    }

    // 获取当前用户的定制请求列表（需要登录）
    @GetMapping("/my-requests")
    public ApiResponse<List<CustomizationResponse>> getMyRequests() {
        return ApiResponse.success(customizationService.getUserRequests());
    }

    // 获取单个定制请求详情
    @GetMapping("/request/{id}")
    public ApiResponse<CustomizationResponse> getRequest(@PathVariable Long id) {
        return ApiResponse.success(customizationService.getRequestById(id));
    }

    // 管理员：更新定制请求状态
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/request/{id}")
    public ApiResponse<Map<String, String>> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam CustomizationRequest.RequestStatus status,
            @RequestParam(required = false) String adminNotes) {
        customizationService.updateStatus(id, status, adminNotes);
        return ApiResponse.success("状态已更新", Map.of("message", "状态已更新"));
    }
}
