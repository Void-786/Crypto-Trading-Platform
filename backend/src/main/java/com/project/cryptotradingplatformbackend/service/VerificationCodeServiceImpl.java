package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.VerificationType;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.modal.VerificationCode;
import com.project.cryptotradingplatformbackend.repository.VerificationCodeRepository;
import com.project.cryptotradingplatformbackend.utils.OtpUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService {

    private final VerificationCodeRepository verificationCodeRepo;

    public VerificationCodeServiceImpl(VerificationCodeRepository verificationCodeRepo) {
        this.verificationCodeRepo = verificationCodeRepo;
    }

    @Override
    public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(OtpUtils.generateOTP());
        verificationCode.setVerificationType(verificationType);
        verificationCode.setUser(user);

        return verificationCodeRepo.save(verificationCode);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception {
        Optional<VerificationCode> verificationCode = verificationCodeRepo.findById(id);
        if (verificationCode.isPresent()) {
            return verificationCode.get();
        }
        throw new Exception("Verification code not found");
    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long userId) {
        return verificationCodeRepo.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCode(VerificationCode verificationCode) {
        verificationCodeRepo.delete(verificationCode);
    }
}
