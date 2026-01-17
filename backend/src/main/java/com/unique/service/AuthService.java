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

    @Transactional
    public AuthResponse smsLogin(SmsLoginRequest request) {
        if (!smsService.verifyCode(request.getPhone(), request.getCode())) {
            throw new BusinessException("验证码错误或已过期");
        }
        User user = userRepository.findByPhone(request.getPhone()).orElse(null);
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
