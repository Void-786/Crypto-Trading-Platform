package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.modal.PaymentDetails;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.repository.PaymentDetailsRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    private final PaymentDetailsRepository paymentDetailsRepo;

    public PaymentDetailsServiceImpl(PaymentDetailsRepository paymentDetailsRepo) {
        this.paymentDetailsRepo = paymentDetailsRepo;
    }

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifscCode, String bankName, User user) {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setIfscCode(ifscCode);
        paymentDetails.setBankName(bankName);
        paymentDetails.setUser(user);

        return paymentDetailsRepo.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(User user) {
        return paymentDetailsRepo.findByUserId(user.getId());
    }
}
