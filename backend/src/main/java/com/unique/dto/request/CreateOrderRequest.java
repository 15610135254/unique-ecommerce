package com.unique.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    @NotEmpty(message = "订单商品不能为空")
    private List<OrderItemRequest> items;

    @NotBlank(message = "收货人姓名不能为空")
    @Size(max = 50, message = "收货人姓名最多50字符")
    private String shippingName;

    @NotBlank(message = "收货地址不能为空")
    @Size(max = 255, message = "收货地址最多255字符")
    private String shippingAddress;

    @NotBlank(message = "收货电话不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String shippingPhone;

    @Size(max = 500, message = "备注最多500字符")
    private String remarks;

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;
    }
}
