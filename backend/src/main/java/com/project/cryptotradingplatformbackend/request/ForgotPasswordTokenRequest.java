package com.project.cryptotradingplatformbackend.request;

import com.project.cryptotradingplatformbackend.domain.VerificationType;
import com.project.cryptotradingplatformbackend.modal.VerificationCode;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {
    private String sendTo;
    private VerificationType verificationType;
}
