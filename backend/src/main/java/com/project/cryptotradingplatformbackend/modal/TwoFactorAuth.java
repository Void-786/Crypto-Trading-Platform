package com.project.cryptotradingplatformbackend.modal;

import com.project.cryptotradingplatformbackend.domain.VerificationType;
import lombok.Data;

@Data
public class TwoFactorAuth {

    private boolean isEnabled = false;

    private VerificationType sendTo;
}
