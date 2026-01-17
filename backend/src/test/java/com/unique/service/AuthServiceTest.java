package com.unique.service;

import com.unique.dto.request.LoginRequest;
import com.unique.entity.User;
import com.unique.exception.BusinessException;
import com.unique.repository.UserRepository;
import com.unique.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private SmsService smsService;

    @InjectMocks
    private AuthService authService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setPhone("13800138000");
        testUser.setUsername("testuser");
        testUser.setPassword("encodedPassword");
        testUser.setRole(User.UserRole.CUSTOMER);
    }

    @Test
    void login_WithValidCredentials_ReturnsAuthResponse() {
        LoginRequest request = new LoginRequest();
        request.setPhone("13800138000");
        request.setPassword("password123");

        when(userRepository.findByPhone("13800138000")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(jwtUtil.generateToken(1L, "13800138000", "CUSTOMER")).thenReturn("test-jwt-token");

        var response = authService.login(request);

        assertNotNull(response);
        assertEquals("test-jwt-token", response.getToken());
        assertNotNull(response.getUser());
        assertEquals(1L, response.getUser().getId());
        assertEquals("testuser", response.getUser().getUsername());

        verify(userRepository).findByPhone("13800138000");
        verify(passwordEncoder).matches("password123", "encodedPassword");
        verify(jwtUtil).generateToken(1L, "13800138000", "CUSTOMER");
    }

    @Test
    void login_WithNonExistentPhone_ThrowsBusinessException() {
        LoginRequest request = new LoginRequest();
        request.setPhone("13800138000");
        request.setPassword("password123");

        when(userRepository.findByPhone("13800138000")).thenReturn(Optional.empty());

        BusinessException exception = assertThrows(BusinessException.class, () -> authService.login(request));

        assertEquals("用户不存在", exception.getMessage());
        verify(userRepository).findByPhone("13800138000");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    void login_WithWrongPassword_ThrowsBusinessException() {
        LoginRequest request = new LoginRequest();
        request.setPhone("13800138000");
        request.setPassword("wrongPassword");

        when(userRepository.findByPhone("13800138000")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        BusinessException exception = assertThrows(BusinessException.class, () -> authService.login(request));

        assertEquals("密码错误", exception.getMessage());
        verify(userRepository).findByPhone("13800138000");
        verify(passwordEncoder).matches("wrongPassword", "encodedPassword");
        verify(jwtUtil, never()).generateToken(any(), anyString(), anyString());
    }
}
