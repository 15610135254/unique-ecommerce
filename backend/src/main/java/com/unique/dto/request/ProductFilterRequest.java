package com.unique.dto.request;

import lombok.Data;

@Data
public class ProductFilterRequest {
    private String category;
    private Boolean isOneOfOne;
    private Boolean isCustomizable;
    private String condition;
    private Integer page = 0;
    private Integer size = 20;
}
