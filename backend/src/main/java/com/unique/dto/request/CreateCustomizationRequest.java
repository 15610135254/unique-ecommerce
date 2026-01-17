package com.unique.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCustomizationRequest {
    @NotBlank(message = "联系人姓名不能为空")
    @Size(max = 50, message = "姓名最多50字符")
    private String contactName;

    @NotBlank(message = "联系方式不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String contactPhone;

    @NotBlank(message = "定制需求不能为空")
    @Size(max = 1000, message = "定制需求最多1000字符")
    private String requirements;

    private Long productId;
}
