package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.config.JwtProvider;
import com.project.cryptotradingplatformbackend.modal.TwoFactorOTP;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.repository.UserRepository;
import com.project.cryptotradingplatformbackend.request.LoginRequest;
import com.project.cryptotradingplatformbackend.response.AuthResponse;
import com.project.cryptotradingplatformbackend.service.CustomUserDetailsService;
import com.project.cryptotradingplatformbackend.service.EmailService;
import com.project.cryptotradingplatformbackend.service.TwoFactorOtpService;
import com.project.cryptotradingplatformbackend.service.WatchlistService;
import com.project.cryptotradingplatformbackend.utils.OtpUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final CustomUserDetailsService customUserDetailsService;
    private final TwoFactorOtpService twoFactorOtpService;
    private final EmailService emailService;
    private final WatchlistService watchlistService;

    public AuthController(UserRepository userRepo, CustomUserDetailsService customUserDetailsService, TwoFactorOtpService twoFactorOtpService, EmailService emailService, WatchlistService watchlistService) {
        this.userRepo = userRepo;
        this.customUserDetailsService = customUserDetailsService;
        this.twoFactorOtpService = twoFactorOtpService;
        this.emailService = emailService;
        this.watchlistService = watchlistService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {

        User isEmailExists = userRepo.findByEmail(user.getEmail());
        if (isEmailExists != null) {
            throw new Exception("Email already exists... ");
        }

        User newUser = new User();
        newUser.setFullName(user.getFullName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        userRepo.save(newUser);
        watchlistService.createWatchlist(newUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("Registered Successfully");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {

        String userName = user.getEmail();
        String password = user.getPassword();

        Authentication auth = authenticate(userName, password);
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        User authUser = userRepo.findByEmail(userName);

        if(user.getTwoFactorAuth().isEnabled()) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Two-Factor Authentication is enabled Successfully");
            authResponse.setTwoFactorAuthEnabled(true);

            String otp = OtpUtils.generateOTP();

            TwoFactorOTP oldTwoFactorOTP = twoFactorOtpService.findByUser(authUser.getId());

            if(oldTwoFactorOTP != null) {
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOTP);
            }

            TwoFactorOTP newTwoFactorOTP = twoFactorOtpService.createTwoFactorOtp(authUser, otp, jwt);

            emailService.sendVerificationOtpEmail(userName, otp);

            authResponse.setSession(newTwoFactorOTP.getId());
            return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("Login Successfully");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/2fa/otp/{otp}")
    public ResponseEntity<AuthResponse> verifyLoginOtp(@PathVariable String otp, @RequestParam String id) throws Exception {
        TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);
        if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP, otp)) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Two-Factor Authentication verified successfully");
            authResponse.setTwoFactorAuthEnabled(true);
            authResponse.setJwt(twoFactorOTP.getJwt());
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }
        throw new Exception("Invalid OTP");
    }

    private Authentication authenticate(String userName, String password){
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);

        if(userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }
        if(!password.equals(userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new  UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }
}