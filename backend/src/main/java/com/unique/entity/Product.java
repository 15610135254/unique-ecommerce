package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_category", columnList = "category_id"),
    @Index(name = "idx_creator", columnList = "creator_id"),
    @Index(name = "idx_created", columnList = "created_at")
})
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 500)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private Creator creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 50)
    private String material;

    @Column(length = 50)
    private String categoryDisplay;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isCustomizable = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isOneOfOne = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isNew = false;

    @Column(nullable = false)
    @Builder.Default
    private Integer stockQuantity = 1;

    @Column(name = "product_condition", length = 20)
    private String condition;
}
