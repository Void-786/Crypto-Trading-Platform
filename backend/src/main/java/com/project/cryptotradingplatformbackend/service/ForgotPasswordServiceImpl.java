package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.VerificationType;
import com.project.cryptotradingplatformbackend.modal.ForgotPasswordToken;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.repository.ForgotPasswordRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    private final ForgotPasswordRepository forgotPasswordRepo;

    public ForgotPasswordServiceImpl(ForgotPasswordRepository forgotPasswordRepo) {
        this.forgotPasswordRepo = forgotPasswordRepo;
    }


    @Override
    public ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo) {
        ForgotPasswordToken token = new ForgotPasswordToken();
        token.setUser(user);
        token.setSendTo(sendTo);
        token.setVerificationType(verificationType);
        token.setOtp(otp);
        token.setId(id);

        return forgotPasswordRepo.save(token);
    }

    @Override
    public ForgotPasswordToken findById(String Id) {
        Optional<ForgotPasswordToken> token = forgotPasswordRepo.findById(Id);
        return token.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUser(Long userId) {
        return forgotPasswordRepo.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepo.delete(token);
    }
}
