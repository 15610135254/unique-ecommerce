package com.unique.service;

import com.unique.dto.request.CreateOrderRequest;
import com.unique.dto.response.OrderResponse;
import com.unique.entity.*;
import com.unique.exception.BusinessException;
import com.unique.repository.OrderRepository;
import com.unique.repository.OrderItemRepository;
import com.unique.repository.ProductRepository;
import com.unique.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Long.parseLong(principal.toString());
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        Long userId = getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("用户不存在"));

        List<com.unique.dto.request.CreateOrderRequest.OrderItemRequest> items = request.getItems();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (com.unique.dto.request.CreateOrderRequest.OrderItemRequest item : items) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new BusinessException("商品不存在: " + item.getProductId()));

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new BusinessException("商品库存不足: " + product.getName());
            }

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        String orderNo = generateOrderNo();
        Order order = Order.builder()
                .orderNo(orderNo)
                .user(user)
                .totalAmount(totalAmount)
                .status(Order.OrderStatus.PENDING)
                .shippingName(request.getShippingName())
                .shippingAddress(request.getShippingAddress())
                .shippingPhone(request.getShippingPhone())
                .remarks(request.getRemarks())
                .build();

        order = orderRepository.save(order);

        for (com.unique.dto.request.CreateOrderRequest.OrderItemRequest item : items) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new BusinessException("商品不存在: " + item.getProductId()));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(item.getQuantity())
                    .price(product.getPrice())
                    .build();

            orderItemRepository.save(orderItem);

            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            productRepository.save(product);
        }

        return toResponse(order, items);
    }

    public OrderResponse getOrderDetail(Long orderId) {
        Long userId = getCurrentUserId();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException("订单不存在"));

        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException("无权查看该订单");
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);
        return toResponse(order, orderItems);
    }

    public List<OrderResponse> getUserOrders() {
        Long userId = getCurrentUserId();
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return orders.stream()
                .map(order -> {
                    List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
                    return toResponse(order, items);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        Long userId = getCurrentUserId();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException("订单不存在"));

        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException("无权操作该订单");
        }

        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new BusinessException("订单状态不允许取消");
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);

        List<OrderItem> items = orderItemRepository.findByOrderId(orderId);
        for (OrderItem item : items) {
            Product product = item.getProduct();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            productRepository.save(product);
        }
    }

    private String generateOrderNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = String.format("%04d", new Random().nextInt(10000));
        return "UN" + timestamp + random;
    }

    private OrderResponse toResponse(Order order, List<?> itemsOrRequests) {
        List<OrderResponse.OrderItemResponse> itemResponses;

        if (itemsOrRequests.isEmpty()) {
            itemResponses = List.of();
        } else if (itemsOrRequests.get(0) instanceof OrderItem) {
            itemResponses = ((List<OrderItem>) itemsOrRequests).stream()
                    .map(item -> OrderResponse.OrderItemResponse.builder()
                            .productId(item.getProduct().getId())
                            .productName(item.getProduct().getName())
                            .productImage(item.getProduct().getImage())
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .subtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                            .build())
                    .collect(Collectors.toList());
        } else {
            itemResponses = ((List<com.unique.dto.request.CreateOrderRequest.OrderItemRequest>) itemsOrRequests).stream()
                    .map(item -> {
                        Product product = productRepository.findById(item.getProductId()).orElse(null);
                        if (product == null) return null;
                        return OrderResponse.OrderItemResponse.builder()
                                .productId(product.getId())
                                .productName(product.getName())
                                .productImage(product.getImage())
                                .quantity(item.getQuantity())
                                .price(product.getPrice())
                                .subtotal(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                                .build();
                    })
                    .filter(java.util.Objects::nonNull)
                    .collect(Collectors.toList());
        }

        return OrderResponse.builder()
                .id(order.getId())
                .orderNo(order.getOrderNo())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .shippingName(order.getShippingName())
                .shippingAddress(order.getShippingAddress())
                .shippingPhone(order.getShippingPhone())
                .items(itemResponses)
                .build();
    }
}
