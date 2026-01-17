package com.unique.controller;

import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.CreatorResponse;
import com.unique.service.CreatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/creators")
@RequiredArgsConstructor
public class CreatorController {
    private final CreatorService creatorService;

    @GetMapping
    public ApiResponse<List<CreatorResponse>> getAllCreators() {
        return ApiResponse.success(creatorService.getAllCreators());
    }

    @GetMapping("/{id}")
    public ApiResponse<CreatorResponse> getCreator(@PathVariable Long id) {
        return ApiResponse.success(creatorService.getCreatorById(id));
    }
}
