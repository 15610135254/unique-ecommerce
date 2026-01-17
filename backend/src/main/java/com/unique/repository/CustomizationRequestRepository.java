package com.unique.repository;

import com.unique.entity.CustomizationRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomizationRequestRepository extends JpaRepository<CustomizationRequest, Long> {

    List<CustomizationRequest> findByUserIdOrderByCreatedAtDesc(Long userId);

    Page<CustomizationRequest> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    @Query("SELECT cr FROM CustomizationRequest cr ORDER BY cr.createdAt DESC")
    Page<CustomizationRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<CustomizationRequest> findByStatusOrderByCreatedAtDesc(CustomizationRequest.RequestStatus status);

    Long countByStatus(CustomizationRequest.RequestStatus status);
}
