# UNiQUE - 原创手工艺品电商平台

一个连接独立创作者与手工艺品爱好者的全栈电商平台，专注于展示和销售原创手工制品。

## 项目特色

- **侘寂美学设计** - 极简、优雅的视觉风格
- **原创手工艺品** - 陶瓷、织物、金工、纸艺、木作等
- **创作者展示** - 独立创作者的专属画廊与故事
- **定制服务** - 支持用户提交定制需求

## 技术栈

### 后端
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA + MySQL 8.0
- Spring Security + JWT
- Aliyun OSS (文件存储)
- Maven

### 前端
- React 19.2.3 + TypeScript 5.8
- Vite 6.2.0
- Tailwind CSS

## 项目结构

```
calgary/
├── backend/           # Spring Boot 后端
│   ├── src/main/java/com/unique/
│   │   ├── config/      # 配置类 (CORS, Security, JWT)
│   │   ├── controller/  # REST 控制器
│   │   ├── dto/         # 数据传输对象
│   │   ├── entity/      # JPA 实体
│   │   ├── service/     # 业务逻辑层
│   │   └── repository/  # 数据访问层
│   └── Dockerfile
│
└── frontend/          # React 前端
    ├── components/     # React 组件
    ├── src/api/        # API 服务层
    ├── src/hooks/      # 自定义 Hooks
    └── types.ts        # TypeScript 类型定义
```

## 快速开始

### 环境要求

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### 后端启动

```bash
cd backend

# 配置数据库 (修改 application.yml)
# 默认配置: localhost:3306/unique_db

# 启动后端
mvn spring-boot:run
```

后端服务运行在 `http://localhost:8080/api`

### 前端启动

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端服务运行在 `http://localhost:3000`

### Docker 部署

```bash
cd backend
docker-compose up
```

## 测试账号

| 角色 | 手机号 | 密码 |
|------|--------|------|
| 测试用户 | 13800138000 | password123 |
| 管理员 | 13900139000 | admin123 |

## API 端点

| 模块 | 端点 | 说明 |
|------|------|------|
| 认证 | `POST /api/auth/login` | 密码登录 |
| 认证 | `POST /api/auth/send-code` | 发送验证码 |
| 认证 | `POST /api/auth/sms-login` | 短信验证码登录 |
| 商品 | `GET /api/products` | 获取商品列表 |
| 商品 | `GET /api/products/new` | 获取新品 |
| 商品 | `GET /api/products/{id}` | 获取商品详情 |
| 分类 | `GET /api/categories` | 获取分类列表 |
| 创作者 | `GET /api/creators` | 获取创作者列表 |
| 购物车 | `GET /api/cart` | 获取购物车 |
| 购物车 | `POST /api/cart/add` | 添加到购物车 |
| 订单 | `POST /api/orders` | 创建订单 |
| 定制 | `POST /api/customization/request` | 提交定制请求 |

## 核心功能

- **商品展示** - 瀑布流布局，支持分类筛选
- **商品详情** - 详情展示，加入购物车
- **购物车** - 增删改查商品数量
- **用户认证** - 密码登录 / 短信验证码登录
- **定制服务** - 提交定制需求，表单验证

## 许可证

MIT License
