package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.modal.PaymentDetails;
import com.project.cryptotradingplatformbackend.modal.User;

public interface PaymentDetailsService {

    PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifscCode, String bankName, User user);

    PaymentDetails getUserPaymentDetails(User user);
}
