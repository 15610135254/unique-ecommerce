package com.unique.controller;

import com.unique.dto.request.CreateOrderRequest;
import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.OrderResponse;
import com.unique.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ApiResponse.success("订单创建成功", response);
    }

    @GetMapping("/{orderId}")
    public ApiResponse<OrderResponse> getOrderDetail(@PathVariable Long orderId) {
        return ApiResponse.success(orderService.getOrderDetail(orderId));
    }

    @GetMapping
    public ApiResponse<List<OrderResponse>> getUserOrders() {
        return ApiResponse.success(orderService.getUserOrders());
    }

    @PostMapping("/{orderId}/cancel")
    public ApiResponse<Map<String, String>> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ApiResponse.success("订单已取消", Map.of("message", "订单已取消"));
    }
}
