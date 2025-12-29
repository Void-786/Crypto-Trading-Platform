package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.domain.PaymentMethod;
import com.project.cryptotradingplatformbackend.modal.PaymentOrder;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.response.PaymentResponse;
import com.project.cryptotradingplatformbackend.service.PaymentService;
import com.project.cryptotradingplatformbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {

    private final UserService userService;
    private final PaymentService paymentService;

    public PaymentController(UserService userService, PaymentService paymentService) {
        this.userService = userService;
        this.paymentService = paymentService;
    }

    @PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(@PathVariable PaymentMethod paymentMethod,
                                                          @PathVariable Long amount,
                                                          @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        PaymentResponse paymentResponse;
        PaymentOrder paymentOrder = paymentService.createOrder(user, amount, paymentMethod);

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            paymentResponse = paymentService.createRazorpayPaymentLink(user, amount, paymentOrder.getId());
        }
        else {
            paymentResponse = paymentService.createStripePaymentLink(user, amount, paymentOrder.getId());
        }

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}
