package com.unique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomizationResponse {
    private Long id;
    private String contactName;
    private String contactPhone;
    private String requirements;
    private String status;
    private String statusDisplayName;
    private LocalDateTime createdAt;
    private Long productId;
    private String productName;
    private String productImage;
    private String adminNotes;

    public static String getStatusDisplayName(String status) {
        return switch (status) {
            case "PENDING" -> "待处理";
            case "PROCESSING" -> "处理中";
            case "COMPLETED" -> "已完成";
            case "REJECTED" -> "已拒绝";
            default -> status;
        };
    }
}
