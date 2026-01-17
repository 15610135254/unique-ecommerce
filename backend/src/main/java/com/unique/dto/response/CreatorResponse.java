package com.unique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatorResponse {
    private Long id;
    private String name;
    private String avatar;
    private String studioImg;
    private String bio;
    private String specialty;
}
