package com.unique.dto.response;

import com.unique.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private BigDecimal price;
    private String image;
    private String creatorName;
    private String category;
    private String material;
    private String description;
    private Boolean isCustomizable;
    private Boolean isOneOfOne;
    private Boolean isNew;
    private String condition;
    private LocalDateTime createdAt;

    public static ProductResponse from(Product product) {
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
