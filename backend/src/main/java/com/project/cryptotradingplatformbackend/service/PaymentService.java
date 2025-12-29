package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.PaymentMethod;
import com.project.cryptotradingplatformbackend.modal.PaymentOrder;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.response.PaymentResponse;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount, Long orderId  ) throws RazorpayException;

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
}
