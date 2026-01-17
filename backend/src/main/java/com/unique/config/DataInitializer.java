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
        if (categoryRepository.count() > 0) {
            return;
        }

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

        List<Creator> creators = creatorRepository.saveAll(List.of(linYu, weave, suShi, woodHeart));

        linYu = creators.get(0);
        weave = creators.get(1);
        suShi = creators.get(2);
        woodHeart = creators.get(3);

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
                .creator(linYu)
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
