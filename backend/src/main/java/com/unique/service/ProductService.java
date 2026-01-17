package com.unique.service;

import com.unique.dto.request.ProductFilterRequest;
import com.unique.dto.response.CreatorResponse;
import com.unique.dto.response.ProductResponse;
import com.unique.entity.Creator;
import com.unique.entity.Product;
import com.unique.exception.BusinessException;
import com.unique.repository.CreatorRepository;
import com.unique.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CreatorRepository creatorRepository;

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("商品不存在"));
        return toResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getNewProducts() {
        Pageable pageable = PageRequest.of(0, 10);
        return productRepository.findByIsNewTrue(pageable).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllOrderByCreatedAtDesc(pageable)
                .map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> filterProducts(ProductFilterRequest request) {
        Pageable pageable = PageRequest.of(
                request.getPage() != null ? request.getPage() : 0,
                request.getSize() != null ? request.getSize() : 20
        );
        return productRepository.filterProducts(
                request.getCategory(),
                request.getIsOneOfOne(),
                request.getIsCustomizable(),
                request.getCondition(),
                pageable
        ).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCreator(Long creatorId) {
        return productRepository.findByCreatorId(creatorId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .image(product.getImage())
                .creatorName(product.getCreator() != null ? product.getCreator().getName() : null)
                .category(product.getCategoryDisplay())
                .material(product.getMaterial())
                .description(product.getDescription())
                .isCustomizable(product.getIsCustomizable())
                .isOneOfOne(product.getIsOneOfOne())
                .isNew(product.getIsNew())
                .condition(product.getCondition())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
