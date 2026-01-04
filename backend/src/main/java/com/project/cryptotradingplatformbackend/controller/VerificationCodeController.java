package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.service.EmailService;
import com.project.cryptotradingplatformbackend.service.UserService;
import com.project.cryptotradingplatformbackend.service.VerificationCodeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class VerificationCodeController {

    private final VerificationCodeService verificationCodeService;
    private final UserService userService;
    private final EmailService emailService;

    public VerificationCodeController(VerificationCodeService verificationCodeService, UserService userService, EmailService emailService) {
        this.verificationCodeService = verificationCodeService;
        this.userService = userService;
        this.emailService = emailService;
    }


}
