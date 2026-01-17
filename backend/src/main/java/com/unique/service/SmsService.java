package com.unique.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class SmsService {
    private final ConcurrentHashMap<String, SmsCode> smsCodeMap = new ConcurrentHashMap<>();
    private static final int EXPIRE_MINUTES = 5;

    public String sendCode(String phone) {
        String code = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 999999));
        long expireTime = System.currentTimeMillis() + EXPIRE_MINUTES * 60 * 1000;
        smsCodeMap.put(phone, new SmsCode(code, expireTime));
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
