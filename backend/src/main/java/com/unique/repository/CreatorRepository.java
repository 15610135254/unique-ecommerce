package com.unique.repository;

import com.unique.entity.Creator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Long> {

    List<Creator> findBySpecialty(String specialty);
}
