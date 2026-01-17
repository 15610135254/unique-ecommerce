package com.unique.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unique.dto.request.LoginRequest;
import com.unique.entity.User;
import com.unique.repository.UserRepository;
import com.unique.util.JwtUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void login_WithValidCredentials_ReturnsSuccess() throws Exception {
        User user = new User();
        user.setPhone("13800138000");
        user.setPassword(passwordEncoder.encode("password123"));
        user.setRole(User.UserRole.CUSTOMER);
        user.setUsername("testuser");
        userRepository.save(user);

        LoginRequest request = new LoginRequest();
        request.setPhone("13800138000");
        request.setPassword("password123");

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.token").exists())
                .andExpect(jsonPath("$.data.user.phone").value("13800138000"))
                .andExpect(jsonPath("$.data.user.username").value("testuser"));
    }

    @Test
    void login_WithInvalidPassword_ReturnsError() throws Exception {
        User user = new User();
        user.setPhone("13800138000");
        user.setPassword(passwordEncoder.encode("correctPassword"));
        user.setRole(User.UserRole.CUSTOMER);
        user.setUsername("testuser");
        userRepository.save(user);

        LoginRequest request = new LoginRequest();
        request.setPhone("13800138000");
        request.setPassword("wrongPassword");

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("密码错误"));
    }

    @Test
    void login_WithNonExistentPhone_ReturnsError() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setPhone("13800138000");
        request.setPassword("password123");

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("用户不存在"));
    }

    @Test
    void getCurrentUser_WithValidToken_ReturnsUserInfo() throws Exception {
        User user = new User();
        user.setPhone("13800138000");
        user.setUsername("testuser");
        user.setPassword(passwordEncoder.encode("password123"));
        user.setRole(User.UserRole.CUSTOMER);
        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(), user.getPhone(), user.getRole().name());

        mockMvc.perform(get("/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.id").value(user.getId()))
                .andExpect(jsonPath("$.data.phone").value("13800138000"))
                .andExpect(jsonPath("$.data.username").value("testuser"));
    }
}
