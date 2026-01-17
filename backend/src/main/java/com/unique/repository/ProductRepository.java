package com.unique.repository;

import com.unique.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByIsNewTrue(Pageable pageable);

    List<Product> findByCreatorId(Long creatorId);

    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.categoryDisplay = :category) AND " +
           "(:isOneOfOne IS NULL OR p.isOneOfOne = :isOneOfOne) AND " +
           "(:isCustomizable IS NULL OR p.isCustomizable = :isCustomizable) AND " +
           "(:condition IS NULL OR p.condition = :condition)")
    Page<Product> filterProducts(
        @Param("category") String category,
        @Param("isOneOfOne") Boolean isOneOfOne,
        @Param("isCustomizable") Boolean isCustomizable,
        @Param("condition") String condition,
        Pageable pageable
    );

    @Query("SELECT p FROM Product p ORDER BY p.createdAt DESC")
    Page<Product> findAllOrderByCreatedAtDesc(Pageable pageable);
}
