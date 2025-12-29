package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.modal.TwoFactorOTP;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.repository.TwoFactorOtpRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService {

    private TwoFactorOtpRepository twoFactorOtpRepo;

    public TwoFactorOtpServiceImpl(TwoFactorOtpRepository twoFactorOtpRepo) {
        this.twoFactorOtpRepo = twoFactorOtpRepo;
    }

    @Override
    public TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt) {
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        TwoFactorOTP twoFactorOtp = new TwoFactorOTP();
        twoFactorOtp.setId(id);
        twoFactorOtp.setUser(user);
        twoFactorOtp.setOtp(otp);
        twoFactorOtp.setJwt(jwt);

        return twoFactorOtpRepo.save(twoFactorOtp);
    }

    @Override
    public TwoFactorOTP findByUser(Long userId) {
        return twoFactorOtpRepo.findByUserId(userId);
    }

    @Override
    public TwoFactorOTP findById(String id) {
        Optional<TwoFactorOTP> otp = twoFactorOtpRepo.findById(id);
        return otp.orElseThrow(null);
    }

    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOtp, String otp) {
        return twoFactorOtp.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOtp) {
        twoFactorOtpRepo.delete(twoFactorOtp);
    }
}
