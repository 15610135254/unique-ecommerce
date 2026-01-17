package com.unique.service;

import com.unique.dto.request.CreateCustomizationRequest;
import com.unique.dto.response.CustomizationResponse;
import com.unique.entity.CustomizationRequest;
import com.unique.entity.Product;
import com.unique.entity.User;
import com.unique.exception.BusinessException;
import com.unique.repository.CustomizationRequestRepository;
import com.unique.repository.ProductRepository;
import com.unique.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomizationService {

    private final CustomizationRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof String) {
            return null; // 未登录用户
        }
        return Long.parseLong(principal.toString());
    }

    @Transactional
    public CustomizationResponse createRequest(CreateCustomizationRequest dto) {
        User user = null;
        Long userId = getCurrentUserId();
        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
        }

        Product product = null;
        if (dto.getProductId() != null) {
            product = productRepository.findById(dto.getProductId())
                    .orElse(null);
        }

        CustomizationRequest request = CustomizationRequest.builder()
                .contactName(dto.getContactName())
                .contactPhone(dto.getContactPhone())
                .requirements(dto.getRequirements())
                .status(CustomizationRequest.RequestStatus.PENDING)
                .user(user)
                .product(product)
                .build();

        request = requestRepository.save(request);
        return toResponse(request);
    }

    @Transactional(readOnly = true)
    public List<CustomizationResponse> getUserRequests() {
        Long userId = getCurrentUserId();
        if (userId == null) {
            throw new BusinessException("请先登录");
        }
        return requestRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CustomizationResponse getRequestById(Long id) {
        CustomizationRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new BusinessException("定制请求不存在"));

        // 检查权限
        Long userId = getCurrentUserId();
        if (userId != null && request.getUser() != null && !request.getUser().getId().equals(userId)) {
            throw new BusinessException("无权查看该请求");
        }

        return toResponse(request);
    }

    @Transactional
    public void updateStatus(Long id, CustomizationRequest.RequestStatus status, String adminNotes) {
        CustomizationRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new BusinessException("定制请求不存在"));

        request.setStatus(status);
        request.setAdminNotes(adminNotes);
        requestRepository.save(request);
    }

    private CustomizationResponse toResponse(CustomizationRequest request) {
        return CustomizationResponse.builder()
                .id(request.getId())
                .contactName(request.getContactName())
                .contactPhone(request.getContactPhone())
                .requirements(request.getRequirements())
                .status(request.getStatus().name())
                .statusDisplayName(CustomizationResponse.getStatusDisplayName(request.getStatus().name()))
                .createdAt(request.getCreatedAt())
                .productId(request.getProduct() != null ? request.getProduct().getId() : null)
                .productName(request.getProduct() != null ? request.getProduct().getName() : null)
                .productImage(request.getProduct() != null ? request.getProduct().getImage() : null)
                .adminNotes(request.getAdminNotes())
                .build();
    }
}
