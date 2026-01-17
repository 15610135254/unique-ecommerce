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
