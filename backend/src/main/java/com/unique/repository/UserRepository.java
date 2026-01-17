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
