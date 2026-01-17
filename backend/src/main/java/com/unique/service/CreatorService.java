package com.unique.service;

import com.unique.dto.response.CreatorResponse;
import com.unique.entity.Creator;
import com.unique.exception.BusinessException;
import com.unique.repository.CreatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CreatorService {
    private final CreatorRepository creatorRepository;

    public List<CreatorResponse> getAllCreators() {
        return creatorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CreatorResponse getCreatorById(Long id) {
        Creator creator = creatorRepository.findById(id)
                .orElseThrow(() -> new BusinessException("创作者不存在"));
        return toResponse(creator);
    }

    private CreatorResponse toResponse(Creator creator) {
        return CreatorResponse.builder()
                .id(creator.getId())
                .name(creator.getName())
                .avatar(creator.getAvatar())
                .studioImg(creator.getStudioImg())
                .bio(creator.getBio())
                .specialty(creator.getSpecialty())
                .build();
    }
}
