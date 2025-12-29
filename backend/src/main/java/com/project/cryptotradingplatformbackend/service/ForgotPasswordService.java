package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.VerificationType;
import com.project.cryptotradingplatformbackend.modal.ForgotPasswordToken;
import com.project.cryptotradingplatformbackend.modal.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo);

    ForgotPasswordToken findById(String Id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);
}
