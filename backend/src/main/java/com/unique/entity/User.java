package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_phone", columnList = "phone")
})
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false, unique = true, length = 20)
    private String phone;

    @Column(length = 255)
    private String password;

    @Column(length = 50)
    private String username;

    @Column(length = 255)
    private String avatar;

    @Column(length = 100)
    private String wechatOpenid;

    @Column(length = 100)
    private String googleId;

    @Column(length = 100)
    private String appleId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private UserRole role = UserRole.CUSTOMER;

    public enum UserRole {
        CUSTOMER, CREATOR, ADMIN
    }
}
