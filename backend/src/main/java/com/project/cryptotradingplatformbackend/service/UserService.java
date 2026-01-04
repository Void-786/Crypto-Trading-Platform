package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.VerificationType;
import com.project.cryptotradingplatformbackend.modal.User;

public interface UserService {

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long id) throws Exception;

    User findUserProfileByJwt(String jwt) throws Exception;

    User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user);

    void updatePassword(User user, String newPassword);

    User verifyUser(User user);
}
