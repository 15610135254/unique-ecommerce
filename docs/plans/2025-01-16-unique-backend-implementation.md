# 手工艺品电商后端实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为手工艺品电商平台（UNiQUE）构建 Spring Boot + MySQL 后端 API，支持商品展示、用户认证、购物车、订单管理等功能。

**Architecture:** 采用经典的分层架构（Controller → Service → Repository），使用 SpringBoot 3.x + Spring Data JPA + MySQL，配合 JWT 进行身份认证，阿里云OSS 进行文件存储。

**Tech Stack:**
- Java 17 + Spring Boot 3.2
- MySQL 8.0 (数据库)
- Spring Data JPA (ORM)
- Spring Security + JWT (认证)
- Aliyun OSS (文件存储)
- Lombok (减少样板代码)
- Maven (构建工具)

---

## 项目结构概览

```
backend/
├── src/main/java/com/unique/
│   ├── UniqueApplication.java
│   ├── config/          # 配置类 (Security, JWT, OSS, CORS)
│   ├── controller/      # REST API 控制器
│   ├── dto/            # 数据传输对象 (Request/Response)
│   ├── entity/         # JPA 实体类
│   ├── repository/     # 数据访问层
│   ├── service/        # 业务逻辑层
│   ├── exception/      # 全局异常处理
│   └── util/           # 工具类 (JWT, 文件上传)
├── src/main/resources/
│   ├── application.yml
│   └── application-dev.yml
└── pom.xml
```

---

## Task 1: 项目初始化

**Files:**
- Create: `backend/pom.xml`
- Create: `backend/src/main/resources/application.yml`
- Create: `backend/src/main/java/com/unique/UniqueApplication.java`

**Step 1: 创建项目目录结构**

```bash
mkdir -p /Users/zzz/project/test_zcode/backend/src/main/java/com/unique/{config,controller,dto,entity,repository,service,exception,util}
mkdir -p /Users/zzz/project/test_zcode/backend/src/main/resources
mkdir -p /Users/zzz/project/test_zcode/backend/src/test/java/com/unique
```

**Step 2: 创建 pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.unique</groupId>
    <artifactId>unique-backend</artifactId>
    <version>1.0.0</version>
    <name>UNiQUE E-Commerce Backend</name>
    <description>Backend for handmade crafts e-commerce platform</description>

    <properties>
        <java.version>17</java.version>
        <jjwt.version>0.12.3</jjwt.version>
        <aliyun-oss.version>3.17.1</aliyun-oss.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- MySQL Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Aliyun OSS -->
        <dependency>
            <groupId>com.aliyun.oss</groupId>
            <artifactId>aliyun-sdk-oss</artifactId>
            <version>${aliyun-oss.version}</version>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

**Step 3: 创建 application.yml**

```yaml
spring:
  application:
    name: unique-backend

  datasource:
    url: jdbc:mysql://localhost:3306/unique_db?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: ${DB_PASSWORD:root}
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
    open-in-view: false

  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

server:
  port: 8080
  servlet:
    context-path: /api

# JWT配置
jwt:
  secret: ${JWT_SECRET:unique-secret-key-change-in-production-2024}
  expiration: 86400000  # 24小时

# 阿里云OSS配置
aliyun:
  oss:
    endpoint: ${OSS_ENDPOINT:}
    access-key-id: ${OSS_ACCESS_KEY_ID:}
    access-key-secret: ${OSS_ACCESS_KEY_SECRET:}
    bucket-name: ${OSS_BUCKET_NAME:}

# 日志配置
logging:
  level:
    com.unique: DEBUG
    org.hibernate.SQL: DEBUG
```

**Step 4: 创建主启动类**

```java
package com.unique;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UniqueApplication {

    public static void main(String[] args) {
        SpringApplication.run(UniqueApplication.class, args);
    }
}
```

**Step 5: 验证项目可以启动**

```bash
cd /Users/zzz/project/test_zcode/backend
mvn clean compile
```

**Step 6: Git 提交**

```bash
cd /Users/zzz/project/test_zcode
git init
git add backend/
git commit -m "feat: initialize Spring Boot project structure"
```

---

## Task 2: 创建实体类 (Entity)

**Files:**
- Create: `backend/src/main/java/com/unique/entity/User.java`
- Create: `backend/src/main/java/com/unique/entity/Creator.java`
- Create: `backend/src/main/java/com/unique/entity/Category.java`
- Create: `backend/src/main/java/com/unique/entity/Product.java`
- Create: `backend/src/main/java/com/unique/entity/CartItem.java`
- Create: `backend/src/main/java/com/unique/entity/Order.java`
- Create: `backend/src/main/java/com/unique/entity/OrderItem.java`
- Create: `backend/src/main/java/com/unique/entity/BaseEntity.java`

**Step 1: 创建基础实体类 BaseEntity**

```java
package com.unique.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

**Step 2: 创建用户实体 User**

```java
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
```

**Step 3: 创建创作者实体 Creator**

```java
package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "creators")
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Creator extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String avatar;

    @Column(length = 500)
    private String studioImg;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 50)
    private String specialty; // 陶艺、织物、金工等

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
```

**Step 4: 创建分类实体 Category**

```java
package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories")
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 255)
    private String image;

    @Column(length = 50)
    private String nameEn; // 英文名称

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;
}
```

**Step 5: 创建商品实体 Product**

```java
package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_category", columnList = "category_id"),
    @Index(name = "idx_creator", columnList = "creator_id"),
    @Index(name = "idx_created", columnList = "created_at")
})
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 500)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private Creator creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 50)
    private String material; // 材质

    @Column(length = 50)
    private String categoryDisplay; // 显示分类：居家装饰、配饰首饰等

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isCustomizable = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isOneOfOne = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isNew = false;

    @Column(nullable = false)
    @Builder.Default
    private Integer stockQuantity = 1;

    @Column(length = 20)
    private String condition; // NEW 原创新品, VINTAGE 中古孤品
}
```

**Step 6: 创建购物车实体 CartItem**

```java
package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart_items", indexes = {
    @Index(name = "idx_user_product", columnList = "user_id,product_id")
})
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    @Builder.Default
    private Integer quantity = 1;
}
```

**Step 7: 创建订单实体 Order**

```java
package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_user_orders", columnList = "user_id"),
    @Index(name = "idx_order_no", columnList = "order_no")
})
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String orderNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    @Column(length = 255)
    private String shippingAddress;

    @Column(length = 20)
    private String shippingPhone;

    @Column(length = 50)
    private String shippingName;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column
    private LocalDateTime paidAt;

    @Column
    private LocalDateTime shippedAt;

    @Column
    private LocalDateTime deliveredAt;

    public enum OrderStatus {
        PENDING,       // 待支付
        PAID,          // 已支付
        SHIPPED,       // 已发货
        DELIVERED,     // 已送达
        CANCELLED      // 已取消
    }
}
```

**Step 8: 创建订单明细实体 OrderItem**

```java
package com.unique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;  // 下单时的价格
}
```

**Step 9: 启用 JPA Auditing**

```java
package com.unique.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
```

**Step 10: Git 提交**

```bash
git add backend/src/main/java/com/unique/entity/
git add backend/src/main/java/com/unique/config/JpaConfig.java
git commit -m "feat: create JPA entity classes"
```

---

## Task 3: 创建 Repository 层

**Files:**
- Create: `backend/src/main/java/com/unique/repository/UserRepository.java`
- Create: `backend/src/main/java/com/unique/repository/CreatorRepository.java`
- Create: `backend/src/main/java/com/unique/repository/CategoryRepository.java`
- Create: `backend/src/main/java/com/unique/repository/ProductRepository.java`
- Create: `backend/src/main/java/com/unique/repository/CartItemRepository.java`
- Create: `backend/src/main/java/com/unique/repository/OrderRepository.java`
- Create: `backend/src/main/java/com/unique/repository/OrderItemRepository.java`

**Step 1: 创建 UserRepository**

```java
package com.unique.repository;

import com.unique.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPhone(String phone);

    boolean existsByPhone(String phone);

    @Query("SELECT u FROM User u WHERE u.wechatOpenid = :openid")
    Optional<User> findByWechatOpenid(String openid);

    @Query("SELECT u FROM User u WHERE u.googleId = :googleId")
    Optional<User> findByGoogleId(String googleId);

    @Query("SELECT u FROM User u WHERE u.appleId = :appleId")
    Optional<User> findByAppleId(String appleId);
}
```

**Step 2: 创建 CreatorRepository**

```java
package com.unique.repository;

import com.unique.entity.Creator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Long> {

    List<Creator> findBySpecialty(String specialty);
}
```

**Step 3: 创建 CategoryRepository**

```java
package com.unique.repository;

import com.unique.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByParentId(Long parentId);

    List<Category> findByParentIsNull();
}
```

**Step 4: 创建 ProductRepository**

```java
package com.unique.repository;

import com.unique.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByIsNewTrue(Pageable pageable);

    List<Product> findByCreatorId(Long creatorId);

    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.categoryDisplay = :category) AND " +
           "(:isOneOfOne IS NULL OR p.isOneOfOne = :isOneOfOne) AND " +
           "(:isCustomizable IS NULL OR p.isCustomizable = :isCustomizable) AND " +
           "(:condition IS NULL OR p.condition = :condition)")
    Page<Product> filterProducts(
        @Param("category") String category,
        @Param("isOneOfOne") Boolean isOneOfOne,
        @Param("isCustomizable") Boolean isCustomizable,
        @Param("condition") String condition,
        Pageable pageable
    );

    @Query("SELECT p FROM Product p ORDER BY p.createdAt DESC")
    Page<Product> findAllOrderByCreatedAtDesc(Pageable pageable);
}
```

**Step 5: 创建 CartItemRepository**

```java
package com.unique.repository;

import com.unique.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    void deleteByUserIdAndProductId(Long userId, Long productId);

    void deleteByUserId(Long userId);
}
```

**Step 6: 创建 OrderRepository**

```java
package com.unique.repository;

import com.unique.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNo(String orderNo);

    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    boolean existsByOrderNo(String orderNo);
}
```

**Step 7: 创建 OrderItemRepository**

```java
package com.unique.repository;

import com.unique.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderId(Long orderId);
}
```

**Step 8: Git 提交**

```bash
git add backend/src/main/java/com/unique/repository/
git commit -m "feat: create repository layer"
```

---

## Task 4: 创建 DTO 类

**Files:**
- Create: `backend/src/main/java/com/unique/dto/request/LoginRequest.java`
- Create: `backend/src/main/java/com/unique/dto/request/SmsLoginRequest.java`
- Create: `backend/src/main/java/com/unique/dto/request/RegisterRequest.java`
- Create: `backend/src/main/java/com/unique/dto/request/ProductFilterRequest.java`
- Create: `backend/src/main/java/com/unique/dto/request/CreateOrderRequest.java`
- Create: `backend/src/main/java/com/unique/dto/response/AuthResponse.java`
- Create: `backend/src/main/java/com/unique/dto/response/ProductResponse.java`
- Create: `backend/src/main/java/com/unique/dto/response/CreatorResponse.java`
- Create: `backend/src/main/java/com/unique/dto/response/CategoryResponse.java`
- Create: `backend/src/main/java/com/unique/dto/response/CartResponse.java`
- Create: `backend/src/main/java/com/unique/dto/response/OrderResponse.java`
- Create: `backend/src/main/java/com/unique/dto/response/ApiResponse.java`

**Step 1: 创建请求 DTO - LoginRequest**

```java
package com.unique.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    @NotBlank(message = "密码不能为空")
    private String password;
}
```

**Step 2: 创建请求 DTO - SmsLoginRequest**

```java
package com.unique.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SmsLoginRequest {

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    @NotBlank(message = "验证码不能为空")
    @Size(min = 6, max = 6, message = "验证码为6位")
    private String code;
}
```

**Step 3: 创建请求 DTO - RegisterRequest**

```java
package com.unique.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "用户名不能为空")
    @Size(min = 2, max = 50, message = "用户名长度2-50字符")
    private String username;

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    @NotBlank(message = "验证码不能为空")
    @Size(min = 6, max = 6, message = "验证码为6位")
    private String smsCode;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度6-20字符")
    private String password;
}
```

**Step 4: 创建请求 DTO - ProductFilterRequest**

```java
package com.unique.dto.request;

import lombok.Data;

@Data
public class ProductFilterRequest {

    private String category;      // 分类：居家装饰、配饰首饰等
    private Boolean isOneOfOne;   // 仅此一件
    private Boolean isCustomizable; // 支持定制
    private String condition;     // 成色：NEW, VINTAGE
    private Integer page = 0;
    private Integer size = 20;
}
```

**Step 5: 创建请求 DTO - CreateOrderRequest**

```java
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
```

**Step 6: 创建响应 DTO - AuthResponse**

```java
package com.unique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private UserResponse user;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserResponse {
        private Long id;
        private String username;
        private String phone;
        private String avatar;
        private String role;
    }
}
```

**Step 7: 创建响应 DTO - ProductResponse**

```java
package com.unique.dto.response;

import com.unique.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private BigDecimal price;
    private String image;
    private String creatorName;
    private String category;
    private String material;
    private String description;
    private Boolean isCustomizable;
    private Boolean isOneOfOne;
    private Boolean isNew;
    private String condition;
    private LocalDateTime createdAt;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .image(product.getImage())
                .creatorName(product.getCreator() != null ? product.getCreator().getName() : null)
                .category(product.getCategoryDisplay())
                .material(product.getMaterial())
                .description(product.getDescription())
                .isCustomizable(product.getIsCustomizable())
                .isOneOfOne(product.getIsOneOfOne())
                .isNew(product.getIsNew())
                .condition(product.getCondition())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
```

**Step 8: 创建响应 DTO - CreatorResponse**

```java
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
```

**Step 9: 创建响应 DTO - CategoryResponse**

```java
package com.unique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Long id;
    private String name;
    private String nameEn;
    private String image;
}
```

**Step 10: 创建响应 DTO - CartResponse**

```java
package com.unique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {

    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal subtotal;
}
```

**Step 11: 创建响应 DTO - OrderResponse**

```java
package com.unique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long id;
    private String orderNo;
    private BigDecimal totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private String shippingName;
    private String shippingAddress;
    private String shippingPhone;
    private List<OrderItemResponse> items;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private String productImage;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal subtotal;
    }
}
```

**Step 12: 创建通用响应 DTO - ApiResponse**

```java
package com.unique.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    private Integer code;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .code(200)
                .message("success")
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .code(200)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .code(400)
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> error(Integer code, String message) {
        return ApiResponse.<T>builder()
                .code(code)
                .message(message)
                .build();
    }
}
```

**Step 13: Git 提交**

```bash
git add backend/src/main/java/com/unique/dto/
git commit -m "feat: create request and response DTOs"
```

---

## Task 5: JWT 和安全配置

**Files:**
- Create: `backend/src/main/java/com/unique/util/JwtUtil.java`
- Create: `backend/src/main/java/com/unique/config/SecurityConfig.java`
- Create: `backend/src/main/java/com/unique/config/JwtAuthenticationFilter.java`
- Create: `backend/src/main/java/com/unique/config/CorsConfig.java`

**Step 1: 创建 JWT 工具类**

```java
package com.unique.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(Long userId, String phone, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("phone", phone)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return Long.parseLong(claims.getSubject());
    }

    public String getPhoneFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get("phone", String.class);
    }

    public String getRoleFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get("role", String.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

**Step 2: 创建 JWT 认证过滤器**

```java
package com.unique.config;

import com.unique.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Configuration
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                Long userId = jwtUtil.getUserIdFromToken(token);
                String role = jwtUtil.getRoleFromToken(token);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userId,
                                null,
                                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
                        );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
```

**Step 3: 创建安全配置**

```java
package com.unique.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // 公开接口
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/products/**",
                                "/api/categories/**",
                                "/api/creators/**",
                                "/error"
                        ).permitAll()
                        // 需要认证的接口
                        .requestMatchers("/api/cart/**", "/api/orders/**").authenticated()
                        // 管理员接口
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**Step 4: 创建 CORS 配置**

```java
package com.unique.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setExposedHeaders(Arrays.asList("*"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
```

**Step 5: Git 提交**

```bash
git add backend/src/main/java/com/unique/util/
git add backend/src/main/java/com/unique/config/
git commit -m "feat: implement JWT authentication and security configuration"
```

---

## Task 6: 全局异常处理

**Files:**
- Create: `backend/src/main/java/com/unique/exception/BusinessException.java`
- Create: `backend/src/main/java/com/unique/exception/GlobalExceptionHandler.java`

**Step 1: 创建业务异常类**

```java
package com.unique.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {

    private final Integer code;

    public BusinessException(String message) {
        super(message);
        this.code = 400;
    }

    public BusinessException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
        this.code = 400;
    }
}
```

**Step 2: 创建全局异常处理器**

```java
package com.unique.exception;

import com.unique.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 业务异常
    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<?> handleBusinessException(BusinessException e) {
        return ApiResponse.error(e.getCode(), e.getMessage());
    }

    // 参数验证异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<?> handleValidationException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ApiResponse.error(400, "参数验证失败: " + errors.toString());
    }

    // 认证异常
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse<?> handleBadCredentialsException(BadCredentialsException e) {
        return ApiResponse.error(401, "用户名或密码错误");
    }

    // 权限异常
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiResponse<?> handleAccessDeniedException(AccessDeniedException e) {
        return ApiResponse.error(403, "无权限访问");
    }

    // 通用异常
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<?> handleException(Exception e) {
        e.printStackTrace();
        return ApiResponse.error(500, "服务器内部错误: " + e.getMessage());
    }
}
```

**Step 3: Git 提交**

```bash
git add backend/src/main/java/com/unique/exception/
git commit -m "feat: implement global exception handling"
```

---

## Task 7: 认证服务 (AuthService)

**Files:**
- Create: `backend/src/main/java/com/unique/service/AuthService.java`
- Create: `backend/src/main/java/com/unique/service/SmsService.java`

**Step 1: 创建短信服务接口**

```java
package com.unique.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class SmsService {

    // 生产环境应使用 Redis 存储
    private final ConcurrentHashMap<String, SmsCode> smsCodeMap = new ConcurrentHashMap<>();

    private static final int EXPIRE_MINUTES = 5;

    public String sendCode(String phone) {
        String code = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 999999));
        long expireTime = System.currentTimeMillis() + EXPIRE_MINUTES * 60 * 1000;

        smsCodeMap.put(phone, new SmsCode(code, expireTime));

        // TODO: 集成阿里云短信服务发送验证码
        System.out.println("发送验证码到 " + phone + ": " + code);

        return code;
    }

    public boolean verifyCode(String phone, String code) {
        SmsCode smsCode = smsCodeMap.get(phone);
        if (smsCode == null) {
            return false;
        }

        if (System.currentTimeMillis() > smsCode.expireTime) {
            smsCodeMap.remove(phone);
            return false;
        }

        return smsCode.code.equals(code);
    }

    private record SmsCode(String code, long expireTime) {
    }
}
```

**Step 2: 创建认证服务**

```java
package com.unique.service;

import com.unique.dto.request.LoginRequest;
import com.unique.dto.request.RegisterRequest;
import com.unique.dto.request.SmsLoginRequest;
import com.unique.dto.response.AuthResponse;
import com.unique.entity.User;
import com.unique.exception.BusinessException;
import com.unique.repository.UserRepository;
import com.unique.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final SmsService smsService;

    // 密码登录
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new BusinessException("用户不存在"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException("密码错误");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getPhone(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .user(toUserResponse(user))
                .build();
    }

    // 短信验证码登录
    @Transactional
    public AuthResponse smsLogin(SmsLoginRequest request) {
        if (!smsService.verifyCode(request.getPhone(), request.getCode())) {
            throw new BusinessException("验证码错误或已过期");
        }

        User user = userRepository.findByPhone(request.getPhone())
                .orElse(null);

        // 如果用户不存在，自动注册
        if (user == null) {
            user = User.builder()
                    .phone(request.getPhone())
                    .role(User.UserRole.CUSTOMER)
                    .build();
            user = userRepository.save(user);
        }

        String token = jwtUtil.generateToken(user.getId(), user.getPhone(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .user(toUserResponse(user))
                .build();
    }

    // 注册
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new BusinessException("手机号已被注册");
        }

        if (!smsService.verifyCode(request.getPhone(), request.getSmsCode())) {
            throw new BusinessException("验证码错误或已过期");
        }

        User user = User.builder()
                .username(request.getUsername())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.UserRole.CUSTOMER)
                .build();

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(), user.getPhone(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .user(toUserResponse(user))
                .build();
    }

    // 获取当前用户信息
    public AuthResponse.UserResponse getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("用户不存在"));
        return toUserResponse(user);
    }

    private AuthResponse.UserResponse toUserResponse(User user) {
        return AuthResponse.UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .role(user.getRole().name())
                .build();
    }
}
```

**Step 3: Git 提交**

```bash
git add backend/src/main/java/com/unique/service/AuthService.java
git add backend/src/main/java/com/unique/service/SmsService.java
git commit -m "feat: implement authentication service"
```

---

## Task 8: 认证控制器 (AuthController)

**Files:**
- Create: `backend/src/main/java/com/unique/controller/AuthController.java`

**Step 1: 创建认证控制器**

```java
package com.unique.controller;

import com.unique.dto.request.LoginRequest;
import com.unique.dto.request.RegisterRequest;
import com.unique.dto.request.SmsLoginRequest;
import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.AuthResponse;
import com.unique.service.AuthService;
import com.unique.service.SmsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final SmsService smsService;

    // 发送验证码
    @PostMapping("/send-code")
    public ApiResponse<Map<String, String>> sendCode(@RequestParam String phone) {
        smsService.sendCode(phone);
        Map<String, String> result = new HashMap<>();
        result.put("message", "验证码已发送");
        return ApiResponse.success(result);
    }

    // 密码登录
    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ApiResponse.success(response);
    }

    // 短信验证码登录
    @PostMapping("/sms-login")
    public ApiResponse<AuthResponse> smsLogin(@Valid @RequestBody SmsLoginRequest request) {
        AuthResponse response = authService.smsLogin(request);
        return ApiResponse.success(response);
    }

    // 注册
    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ApiResponse.success("注册成功", response);
    }

    // 获取当前用户信息
    @GetMapping("/me")
    public ApiResponse<AuthResponse.UserResponse> getCurrentUser(
            @RequestHeader("Authorization") String authorization) {
        // 从过滤器中获取用户ID
        String token = authorization.substring(7);
        Long userId = (Long) org.springframework.security.core.context.SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        AuthResponse.UserResponse response = authService.getCurrentUser(userId);
        return ApiResponse.success(response);
    }
}
```

**Step 2: 修复 getCurrentUser 方法获取用户ID的方式**

```java
// 在 AuthController 中修改 getCurrentUser 方法
@GetMapping("/me")
public ApiResponse<AuthResponse.UserResponse> getCurrentUser() {
    // 从 SecurityContext 获取用户ID
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Long userId = Long.parseLong(principal.toString());
    AuthResponse.UserResponse response = authService.getCurrentUser(userId);
    return ApiResponse.success(response);
}
```

**Step 3: 测试认证 API**

```bash
# 启动项目
cd /Users/zzz/project/test_zcode/backend
mvn spring-boot:run

# 测试发送验证码
curl -X POST "http://localhost:8080/api/auth/send-code?phone=13800138000"

# 测试注册
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "测试用户",
    "phone": "13800138000",
    "smsCode": "123456",
    "password": "password123"
  }'
```

**Step 4: Git 提交**

```bash
git add backend/src/main/java/com/unique/controller/AuthController.java
git commit -m "feat: implement auth controller endpoints"
```

---

## Task 9: 商品服务 (ProductService) 和控制器

**Files:**
- Create: `backend/src/main/java/com/unique/service/ProductService.java`
- Create: `backend/src/main/java/com/unique/service/CategoryService.java`
- Create: `backend/src/main/java/com/unique/service/CreatorService.java`
- Create: `backend/src/main/java/com/unique/controller/ProductController.java`
- Create: `backend/src/main/java/com/unique/controller/CategoryController.java`
- Create: `backend/src/main/java/com/unique/controller/CreatorController.java`

**Step 1: 创建商品服务**

```java
package com.unique.service;

import com.unique.dto.request.ProductFilterRequest;
import com.unique.dto.response.CategoryResponse;
import com.unique.dto.response.CreatorResponse;
import com.unique.dto.response.ProductResponse;
import com.unique.entity.Category;
import com.unique.entity.Creator;
import com.unique.entity.Product;
import com.unique.exception.BusinessException;
import com.unique.repository.CategoryRepository;
import com.unique.repository.CreatorRepository;
import com.unique.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CreatorRepository creatorRepository;
    private final CategoryRepository categoryRepository;

    // 获取商品详情
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("商品不存在"));
        return toResponse(product);
    }

    // 获取新品
    public List<ProductResponse> getNewProducts() {
        Pageable pageable = PageRequest.of(0, 10);
        return productRepository.findByIsNewTrue(pageable).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // 获取所有商品（分页）
    public Page<ProductResponse> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllOrderByCreatedAtDesc(pageable)
                .map(this::toResponse);
    }

    // 筛选商品
    public Page<ProductResponse> filterProducts(ProductFilterRequest request) {
        Pageable pageable = PageRequest.of(
                request.getPage() != null ? request.getPage() : 0,
                request.getSize() != null ? request.getSize() : 20
        );

        return productRepository.filterProducts(
                request.getCategory(),
                request.getIsOneOfOne(),
                request.getIsCustomizable(),
                request.getCondition(),
                pageable
        ).map(this::toResponse);
    }

    // 按创作者获取商品
    public List<ProductResponse> getProductsByCreator(Long creatorId) {
        return productRepository.findByCreatorId(creatorId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // 按分类获取商品
    public List<ProductResponse> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .image(product.getImage())
                .creatorName(product.getCreator() != null ? product.getCreator().getName() : null)
                .category(product.getCategoryDisplay())
                .material(product.getMaterial())
                .description(product.getDescription())
                .isCustomizable(product.getIsCustomizable())
                .isOneOfOne(product.getIsOneOfOne())
                .isNew(product.getIsNew())
                .condition(product.getCondition())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
```

**Step 2: 创建分类服务**

```java
package com.unique.service;

import com.unique.dto.response.CategoryResponse;
import com.unique.entity.Category;
import com.unique.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<CategoryResponse> getTopCategories() {
        return categoryRepository.findByParentIsNull().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .nameEn(category.getNameEn())
                .image(category.getImage())
                .build();
    }
}
```

**Step 3: 创建创作者服务**

```java
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
```

**Step 4: 创建商品控制器**

```java
package com.unique.controller;

import com.unique.dto.request.ProductFilterRequest;
import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.ProductResponse;
import com.unique.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // 获取商品详情
    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getProduct(@PathVariable Long id) {
        return ApiResponse.success(productService.getProductById(id));
    }

    // 获取新品
    @GetMapping("/new")
    public ApiResponse<List<ProductResponse>> getNewProducts() {
        return ApiResponse.success(productService.getNewProducts());
    }

    // 获取所有商品（分页）
    @GetMapping
    public ApiResponse<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.success(productService.getAllProducts(page, size));
    }

    // 筛选商品
    @PostMapping("/filter")
    public ApiResponse<Page<ProductResponse>> filterProducts(@RequestBody ProductFilterRequest request) {
        return ApiResponse.success(productService.filterProducts(request));
    }

    // 按创作者获取商品
    @GetMapping("/creator/{creatorId}")
    public ApiResponse<List<ProductResponse>> getProductsByCreator(@PathVariable Long creatorId) {
        return ApiResponse.success(productService.getProductsByCreator(creatorId));
    }

    // 按分类获取商品
    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<ProductResponse>> getProductsByCategory(@PathVariable Long categoryId) {
        return ApiResponse.success(productService.getProductsByCategory(categoryId));
    }
}
```

**Step 5: 创建分类控制器**

```java
package com.unique.controller;

import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.CategoryResponse;
import com.unique.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAllCategories() {
        return ApiResponse.success(categoryService.getAllCategories());
    }

    @GetMapping("/top")
    public ApiResponse<List<CategoryResponse>> getTopCategories() {
        return ApiResponse.success(categoryService.getTopCategories());
    }
}
```

**Step 6: 创建创作者控制器**

```java
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
```

**Step 7: Git 提交**

```bash
git add backend/src/main/java/com/unique/service/ProductService.java
git add backend/src/main/java/com/unique/service/CategoryService.java
git add backend/src/main/java/com/unique/service/CreatorService.java
git add backend/src/main/java/com/unique/controller/ProductController.java
git add backend/src/main/java/com/unique/controller/CategoryController.java
git add backend/src/main/java/com/unique/controller/CreatorController.java
git commit -m "feat: implement product, category and creator services and controllers"
```

---

## Task 10: 购物车服务和控制器

**Files:**
- Create: `backend/src/main/java/com/unique/service/CartService.java`
- Create: `backend/src/main/java/com/unique/controller/CartController.java`

**Step 1: 创建购物车服务**

```java
package com.unique.service;

import com.unique.dto.response.CartResponse;
import com.unique.entity.CartItem;
import com.unique.entity.Product;
import com.unique.entity.User;
import com.unique.exception.BusinessException;
import com.unique.repository.CartItemRepository;
import com.unique.repository.ProductRepository;
import com.unique.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // 获取当前登录用户ID
    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Long.parseLong(principal.toString());
    }

    // 获取购物车列表
    public List<CartResponse> getCartItems() {
        Long userId = getCurrentUserId();
        return cartItemRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // 添加商品到购物车
    @Transactional
    public CartResponse addToCart(Long productId, Integer quantity) {
        Long userId = getCurrentUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("用户不存在"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException("商品不存在"));

        // 检查库存
        if (product.getStockQuantity() < quantity) {
            throw new BusinessException("库存不足");
        }

        // 检查购物车是否已有该商品
        CartItem existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem = cartItemRepository.save(existingItem);
            return toResponse(existingItem);
        }

        CartItem cartItem = CartItem.builder()
                .user(user)
                .product(product)
                .quantity(quantity)
                .build();

        cartItem = cartItemRepository.save(cartItem);
        return toResponse(cartItem);
    }

    // 更新购物车商品数量
    @Transactional
    public CartResponse updateCartItem(Long productId, Integer quantity) {
        Long userId = getCurrentUserId();

        if (quantity <= 0) {
            removeFromCart(productId);
            return null;
        }

        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new BusinessException("购物车中没有该商品"));

        cartItem.setQuantity(quantity);
        cartItem = cartItemRepository.save(cartItem);

        return toResponse(cartItem);
    }

    // 从购物车移除商品
    @Transactional
    public void removeFromCart(Long productId) {
        Long userId = getCurrentUserId();
        cartItemRepository.deleteByUserIdAndProductId(userId, productId);
    }

    // 清空购物车
    @Transactional
    public void clearCart() {
        Long userId = getCurrentUserId();
        cartItemRepository.deleteByUserId(userId);
    }

    // 获取购物车商品数量
    public int getCartCount() {
        Long userId = getCurrentUserId();
        List<CartItem> items = cartItemRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return items.stream().mapToInt(CartItem::getQuantity).sum();
    }

    private CartResponse toResponse(CartItem item) {
        Product product = item.getProduct();
        BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

        return CartResponse.builder()
                .id(item.getId())
                .productId(product.getId())
                .productName(product.getName())
                .productImage(product.getImage())
                .price(product.getPrice())
                .quantity(item.getQuantity())
                .subtotal(subtotal)
                .build();
    }
}
```

**Step 2: 创建购物车控制器**

```java
package com.unique.controller;

import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.CartResponse;
import com.unique.service.CartService;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // 获取购物车列表
    @GetMapping
    public ApiResponse<List<CartResponse>> getCartItems() {
        return ApiResponse.success(cartService.getCartItems());
    }

    // 添加商品到购物车
    @PostMapping("/add")
    public ApiResponse<CartResponse> addToCart(
            @RequestParam @NotNull Long productId,
            @RequestParam(defaultValue = "1") @Min(1) Integer quantity) {
        return ApiResponse.success("已添加到购物车", cartService.addToCart(productId, quantity));
    }

    // 更新购物车商品数量
    @PutMapping("/update")
    public ApiResponse<CartResponse> updateCartItem(
            @RequestParam @NotNull Long productId,
            @RequestParam @NotNull Integer quantity) {
        CartResponse response = cartService.updateCartItem(productId, quantity);
        return ApiResponse.success("购物车已更新", response);
    }

    // 从购物车移除商品
    @DeleteMapping("/remove")
    public ApiResponse<Map<String, String>> removeFromCart(@RequestParam @NotNull Long productId) {
        cartService.removeFromCart(productId);
        return ApiResponse.success("商品已移除", Map.of("message", "商品已移除"));
    }

    // 清空购物车
    @DeleteMapping("/clear")
    public ApiResponse<Map<String, String>> clearCart() {
        cartService.clearCart();
        return ApiResponse.success("购物车已清空", Map.of("message", "购物车已清空"));
    }

    // 获取购物车商品数量
    @GetMapping("/count")
    public ApiResponse<Map<String, Integer>> getCartCount() {
        return ApiResponse.success(Map.of("count", cartService.getCartCount()));
    }
}
```

**Step 3: Git 提交**

```bash
git add backend/src/main/java/com/unique/service/CartService.java
git add backend/src/main/java/com/unique/controller/CartController.java
git commit -m "feat: implement shopping cart service and controller"
```

---

## Task 11: 订单服务和控制器

**Files:**
- Create: `backend/src/main/java/com/unique/service/OrderService.java`
- Create: `backend/src/main/java/com/unique/controller/OrderController.java`

**Step 1: 创建订单服务**

```java
package com.unique.service;

import com.unique.dto.request.CreateOrderRequest;
import com.unique.dto.response.OrderResponse;
import com.unique.entity.*;
import com.unique.exception.BusinessException;
import com.unique.repository.OrderRepository;
import com.unique.repository.OrderItemRepository;
import com.unique.repository.ProductRepository;
import com.unique.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Long.parseLong(principal.toString());
    }

    // 创建订单
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        Long userId = getCurrentUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("用户不存在"));

        // 验证商品并计算总价
        List<com.unique.dto.request.CreateOrderRequest.OrderItemRequest> items = request.getItems();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (com.unique.dto.request.CreateOrderRequest.OrderItemRequest item : items) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new BusinessException("商品不存在: " + item.getProductId()));

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new BusinessException("商品库存不足: " + product.getName());
            }

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        // 创建订单
        String orderNo = generateOrderNo();
        Order order = Order.builder()
                .orderNo(orderNo)
                .user(user)
                .totalAmount(totalAmount)
                .status(Order.OrderStatus.PENDING)
                .shippingName(request.getShippingName())
                .shippingAddress(request.getShippingAddress())
                .shippingPhone(request.getShippingPhone())
                .remarks(request.getRemarks())
                .build();

        order = orderRepository.save(order);

        // 创建订单明细
        for (com.unique.dto.request.CreateOrderRequest.OrderItemRequest item : items) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new BusinessException("商品不存在: " + item.getProductId()));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(item.getQuantity())
                    .price(product.getPrice())
                    .build();

            orderItemRepository.save(orderItem);

            // 扣减库存
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            productRepository.save(product);
        }

        return toResponse(order, items);
    }

    // 获取订单详情
    public OrderResponse getOrderDetail(Long orderId) {
        Long userId = getCurrentUserId();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException("订单不存在"));

        // 验证订单所有权
        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException("无权查看该订单");
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);

        return toResponse(order, orderItems);
    }

    // 获取用户订单列表
    public List<OrderResponse> getUserOrders() {
        Long userId = getCurrentUserId();
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return orders.stream()
                .map(order -> {
                    List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
                    return toResponse(order, items);
                })
                .collect(Collectors.toList());
    }

    // 取消订单
    @Transactional
    public void cancelOrder(Long orderId) {
        Long userId = getCurrentUserId();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException("订单不存在"));

        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException("无权操作该订单");
        }

        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new BusinessException("订单状态不允许取消");
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);

        // 恢复库存
        List<OrderItem> items = orderItemRepository.findByOrderId(orderId);
        for (OrderItem item : items) {
            Product product = item.getProduct();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            productRepository.save(product);
        }
    }

    // 生成订单号
    private String generateOrderNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = String.format("%04d", new Random().nextInt(10000));
        return "UN" + timestamp + random;
    }

    private OrderResponse toResponse(Order order, List<?> itemsOrRequests) {
        List<OrderResponse.OrderItemResponse> itemResponses;

        if (itemsOrRequests.isEmpty()) {
            itemResponses = List.of();
        } else if (itemsOrRequests.get(0) instanceof OrderItem) {
            itemResponses = ((List<OrderItem>) itemsOrRequests).stream()
                    .map(item -> OrderResponse.OrderItemResponse.builder()
                            .productId(item.getProduct().getId())
                            .productName(item.getProduct().getName())
                            .productImage(item.getProduct().getImage())
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .subtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                            .build())
                    .collect(Collectors.toList());
        } else {
            // 来自请求的数据
            itemResponses = ((List<com.unique.dto.request.CreateOrderRequest.OrderItemRequest>) itemsOrRequests).stream()
                    .map(item -> {
                        Product product = productRepository.findById(item.getProductId()).orElse(null);
                        if (product == null) return null;
                        return OrderResponse.OrderItemResponse.builder()
                                .productId(product.getId())
                                .productName(product.getName())
                                .productImage(product.getImage())
                                .quantity(item.getQuantity())
                                .price(product.getPrice())
                                .subtotal(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                                .build();
                    })
                    .filter(java.util.Objects::nonNull)
                    .collect(Collectors.toList());
        }

        return OrderResponse.builder()
                .id(order.getId())
                .orderNo(order.getOrderNo())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .shippingName(order.getShippingName())
                .shippingAddress(order.getShippingAddress())
                .shippingPhone(order.getShippingPhone())
                .items(itemResponses)
                .build();
    }
}
```

**Step 2: 创建订单控制器**

```java
package com.unique.controller;

import com.unique.dto.request.CreateOrderRequest;
import com.unique.dto.response.ApiResponse;
import com.unique.dto.response.OrderResponse;
import com.unique.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 创建订单
    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ApiResponse.success("订单创建成功", response);
    }

    // 获取订单详情
    @GetMapping("/{orderId}")
    public ApiResponse<OrderResponse> getOrderDetail(@PathVariable Long orderId) {
        return ApiResponse.success(orderService.getOrderDetail(orderId));
    }

    // 获取用户订单列表
    @GetMapping
    public ApiResponse<List<OrderResponse>> getUserOrders() {
        return ApiResponse.success(orderService.getUserOrders());
    }

    // 取消订单
    @PostMapping("/{orderId}/cancel")
    public ApiResponse<Map<String, String>> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ApiResponse.success("订单已取消", Map.of("message", "订单已取消"));
    }
}
```

**Step 3: Git 提交**

```bash
git add backend/src/main/java/com/unique/service/OrderService.java
git add backend/src/main/java/com/unique/controller/OrderController.java
git commit -m "feat: implement order service and controller"
```

---

## Task 12: 数据初始化

**Files:**
- Create: `backend/src/main/java/com/unique/config/DataInitializer.java`

**Step 1: 创建数据初始化器**

```java
package com.unique.config;

import com.unique.entity.*;
import com.unique.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final CreatorRepository creatorRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // 只在数据库为空时初始化
        if (categoryRepository.count() > 0) {
            return;
        }

        // 创建分类
        Category pottery = Category.builder()
                .name("陶艺")
                .nameEn("Pottery")
                .image("https://picsum.photos/seed/pottery/400/400")
                .build();

        Category textile = Category.builder()
                .name("织物")
                .nameEn("Textile")
                .image("https://picsum.photos/seed/fabric/400/400")
                .build();

        Category metal = Category.builder()
                .name("金工")
                .nameEn("Metalwork")
                .image("https://picsum.photos/seed/metal/400/400")
                .build();

        Category paper = Category.builder()
                .name("纸本")
                .nameEn("Paper Art")
                .image("https://picsum.photos/seed/paper/400/400")
                .build();

        Category wood = Category.builder()
                .name("原木")
                .nameEn("Woodwork")
                .image("https://picsum.photos/seed/wood/400/400")
                .build();

        categoryRepository.saveAll(List.of(pottery, textile, metal, paper, wood));

        // 创建创作者
        Creator linYu = Creator.builder()
                .name("林语陶瓷工作室")
                .avatar("https://picsum.photos/seed/avatar1/200/200")
                .studioImg("https://picsum.photos/seed/studio1/1200/600")
                .bio("在景德镇的一隅，我试图通过双手寻找泥土与火的边界。每一件作品都是一次与自然的对话，不求完美，只求真实。")
                .specialty("陶艺")
                .build();

        Creator weave = Creator.builder()
                .name("織间")
                .avatar("https://picsum.photos/seed/avatar2/200/200")
                .studioImg("https://picsum.photos/seed/studio2/1200/600")
                .bio("天然材质，经纬之间尽显手工温度。")
                .specialty("织物")
                .build();

        Creator suShi = Creator.builder()
                .name("素石金工")
                .avatar("https://picsum.photos/seed/avatar3/200/200")
                .studioImg("https://picsum.photos/seed/studio3/1200/600")
                .bio("手工锤打纹路，随着佩戴时间展现独特的氧化光泽。")
                .specialty("金工")
                .build();

        Creator woodHeart = Creator.builder()
                .name("木心手作")
                .avatar("https://picsum.photos/seed/avatar4/200/200")
                .studioImg("https://picsum.photos/seed/studio4/1200/600")
                .bio("选用上等黑胡桃木，天然植物油涂装。")
                .specialty("原木")
                .build();

        creatorRepository.saveAll(List.of(linYu, weave, suShi, woodHeart));

        // 创建商品
        Product p1 = Product.builder()
                .name("侘寂粗陶花器")
                .price(new BigDecimal("380"))
                .image("https://picsum.photos/seed/p1/800/1000")
                .creator(linYu)
                .category(pottery)
                .categoryDisplay("居家装饰")
                .material("粗陶")
                .description("手工捏制，每一件都有独特的烧制纹理，保留泥土最原始的呼吸感。")
                .isCustomizable(false)
                .isOneOfOne(true)
                .isNew(true)
                .stockQuantity(1)
                .condition("NEW")
                .build();

        Product p2 = Product.builder()
                .name("手织亚麻茶席")
                .price(new BigDecimal("260"))
                .image("https://picsum.photos/seed/p2/800/800")
                .creator(weave)
                .category(textile)
                .categoryDisplay("居家装饰")
                .material("亚麻")
                .description("天然亚麻材质，经纬之间尽显手工温度。")
                .isCustomizable(true)
                .isOneOfOne(false)
                .isNew(true)
                .stockQuantity(10)
                .condition("NEW")
                .build();

        Product p3 = Product.builder()
                .name("锤纹纯银戒指")
                .price(new BigDecimal("520"))
                .image("https://picsum.photos/seed/p3/800/1000")
                .creator(suShi)
                .category(metal)
                .categoryDisplay("配饰首饰")
                .material("纯银")
                .description("手工锤打纹路，随着佩戴时间展现独特的氧化光泽。")
                .isCustomizable(true)
                .isOneOfOne(false)
                .isNew(true)
                .stockQuantity(5)
                .condition("NEW")
                .build();

        Product p4 = Product.builder()
                .name("再生纸手工画册")
                .price(new BigDecimal("180"))
                .image("https://picsum.photos/seed/p4/800/1200")
                .category(paper)
                .categoryDisplay("独立刊物")
                .material("再生纸")
                .description("环保再生纸张，手工缝线装订。")
                .isCustomizable(false)
                .isOneOfOne(false)
                .stockQuantity(20)
                .condition("NEW")
                .build();

        Product p5 = Product.builder()
                .name("黑胡桃木极简托盘")
                .price(new BigDecimal("450"))
                .image("https://picsum.photos/seed/p5/800/1000")
                .creator(woodHeart)
                .category(wood)
                .categoryDisplay("居家装饰")
                .material("原木")
                .description("选用上等黑胡桃木，天然植物油涂装。")
                .isCustomizable(true)
                .isOneOfOne(true)
                .stockQuantity(1)
                .condition("NEW")
                .build();

        Product p6 = Product.builder()
                .name("复古真皮医生包")
                .price(new BigDecimal("1280"))
                .image("https://picsum.photos/seed/p6/800/1000")
                .creator(linYu)
                .category(pottery)
                .categoryDisplay("手工包袋")
                .material("真皮")
                .description("植鞣牛皮，全手缝制，陪伴一生的质感。")
                .isCustomizable(false)
                .isOneOfOne(false)
                .stockQuantity(3)
                .condition("NEW")
                .build();

        productRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6));

        // 创建测试用户
        User testUser = User.builder()
                .username("测试用户")
                .phone("13800138000")
                .password(passwordEncoder.encode("password123"))
                .role(User.UserRole.CUSTOMER)
                .build();

        User adminUser = User.builder()
                .username("管理员")
                .phone("13900139000")
                .password(passwordEncoder.encode("admin123"))
                .role(User.UserRole.ADMIN)
                .build();

        userRepository.saveAll(List.of(testUser, adminUser));

        System.out.println("========== 数据初始化完成 ==========");
        System.out.println("测试用户: 13800138000 / password123");
        System.out.println("管理员: 13900139000 / admin123");
    }
}
```

**Step 2: Git 提交**

```bash
git add backend/src/main/java/com/unique/config/DataInitializer.java
git commit -m "feat: add data initializer with sample data"
```

---

## Task 13: API 文档和部署配置

**Files:**
- Create: `backend/README.md`
- Create: `backend/.env.example`
- Create: `backend/Dockerfile`
- Create: `backend/docker-compose.yml`

**Step 1: 创建 API 文档**

```markdown
# UNiQUE 电商后端 API 文档

## 技术栈
- Java 17
- Spring Boot 3.2
- MySQL 8.0
- Spring Data JPA
- Spring Security + JWT

## 启动方式

### 本地开发
```bash
# 1. 安装 MySQL 8.0
# 2. 创建数据库
mysql -u root -p
CREATE DATABASE unique_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 3. 配置 application.yml 中的数据库连接

# 4. 启动项目
mvn spring-boot:run
```

### Docker 部署
```bash
docker-compose up -d
```

## API 接口

### 认证接口 `/api/auth`

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/auth/send-code` | 发送短信验证码 | 否 |
| POST | `/auth/login` | 密码登录 | 否 |
| POST | `/auth/sms-login` | 短信验证码登录 | 否 |
| POST | `/auth/register` | 用户注册 | 否 |
| GET | `/auth/me` | 获取当前用户信息 | 是 |

### 商品接口 `/api/products`

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/products/{id}` | 获取商品详情 | 否 |
| GET | `/products/new` | 获取新品 | 否 |
| GET | `/products` | 获取商品列表(分页) | 否 |
| POST | `/products/filter` | 筛选商品 | 否 |
| GET | `/products/creator/{id}` | 获取创作者的商品 | 否 |
| GET | `/products/category/{id}` | 获取分类的商品 | 否 |

### 分类接口 `/api/categories`

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/categories` | 获取所有分类 | 否 |
| GET | `/categories/top` | 获取顶级分类 | 否 |

### 创作者接口 `/api/creators`

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/creators` | 获取所有创作者 | 否 |
| GET | `/creators/{id}` | 获取创作者详情 | 否 |

### 购物车接口 `/api/cart`

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/cart` | 获取购物车 | 是 |
| POST | `/cart/add` | 添加商品到购物车 | 是 |
| PUT | `/cart/update` | 更新购物车商品数量 | 是 |
| DELETE | `/cart/remove` | 移除购物车商品 | 是 |
| DELETE | `/cart/clear` | 清空购物车 | 是 |
| GET | `/cart/count` | 获取购物车商品数量 | 是 |

### 订单接口 `/api/orders`

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/orders` | 创建订单 | 是 |
| GET | `/orders/{id}` | 获取订单详情 | 是 |
| GET | `/orders` | 获取用户订单列表 | 是 |
| POST | `/orders/{id}/cancel` | 取消订单 | 是 |

## 认证方式

在需要认证的接口请求头中添加：
```
Authorization: Bearer <token>
```

## 响应格式

成功响应：
```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

错误响应：
```json
{
  "code": 400,
  "message": "错误信息"
}
```
```

**Step 2: 创建环境变量示例文件**

```env
# 数据库配置
DB_PASSWORD=your_db_password

# JWT 密钥
JWT_SECRET=your-secret-key-change-in-production

# 阿里云 OSS 配置
OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_access_secret
OSS_BUCKET_NAME=your_bucket_name
```

**Step 3: 创建 Dockerfile**

```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Step 4: 创建 docker-compose.yml**

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: unique_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: unique_db
      MYSQL_CHARACTER_SET_SERVER: utf8mb4
      MYSQL_COLLATION_SERVER: utf8mb4_unicode_ci
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - unique_network

  backend:
    build: .
    container_name: unique_backend
    environment:
      DB_PASSWORD: root
      JWT_SECRET: unique-secret-key-change-in-production
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    networks:
      - unique_network

volumes:
  mysql_data:

networks:
  unique_network:
```

**Step 5: Git 提交**

```bash
git add backend/README.md backend/.env.example backend/Dockerfile backend/docker-compose.yml
git commit -m "docs: add API documentation and deployment configuration"
```

---

## 总结

### 完成的功能模块

1. ✅ 项目初始化 - Spring Boot + Maven
2. ✅ 实体层 - 7个核心实体类
3. ✅ Repository 层 - 7个数据访问接口
4. ✅ DTO 层 - 请求/响应对象
5. ✅ 安全配置 - JWT + Spring Security
6. ✅ 异常处理 - 全局异常捕获
7. ✅ 认证服务 - 登录/注册/短信验证
8. ✅ 商品服务 - 商品查询/筛选
9. ✅ 购物车服务 - CRUD 操作
10. ✅ 订单服务 - 创建/查询/取消订单
11. ✅ 数据初始化 - 示例数据
12. ✅ API 文档和部署配置

### API 端点概览

| 分类 | 端点数 | 说明 |
|------|--------|------|
| 认证 | 5 | 登录、注册、发送验证码 |
| 商品 | 6 | 查询、筛选、按分类/创作者 |
| 分类 | 2 | 获取分类列表 |
| 创作者 | 2 | 获取创作者列表和详情 |
| 购物车 | 6 | 购物车 CRUD 操作 |
| 订单 | 4 | 创建、查询、取消订单 |

### 后续优化方向

1. 集成阿里云短信服务
2. 集成阿里云 OSS 文件上传
3. 添加支付功能（微信/支付宝）
4. 添加商品搜索（Elasticsearch）
5. 添加缓存（Redis）
6. 添加单元测试和集成测试
7. API 文档（Swagger/OpenAPI）
