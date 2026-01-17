package com.unique.controller;

import com.unique.dto.request.LoginRequest;
import com.unique.dto.request.RegisterRequest;
import com.unique.dto.request.SmsLoginRequest;
import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.AuthResponse;
import com.unique.service.AuthService;
import com.unique.service.SmsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final SmsService smsService;

    @PostMapping("/send-code")
    public ApiResponse<Map<String, String>> sendCode(@RequestParam String phone) {
        smsService.sendCode(phone);
        Map<String, String> result = new HashMap<>();
        result.put("message", "验证码已发送");
        return ApiResponse.success(result);
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ApiResponse.success(response);
    }

    @PostMapping("/sms-login")
    public ApiResponse<AuthResponse> smsLogin(@Valid @RequestBody SmsLoginRequest request) {
        AuthResponse response = authService.smsLogin(request);
        return ApiResponse.success(response);
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ApiResponse.success("注册成功", response);
    }

    @GetMapping("/me")
    public ApiResponse<AuthResponse.UserResponse> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = Long.parseLong(principal.toString());
        AuthResponse.UserResponse response = authService.getCurrentUser(userId);
        return ApiResponse.success(response);
    }
}
