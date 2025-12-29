package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.domain.WalletTransactionType;
import com.project.cryptotradingplatformbackend.modal.*;
import com.project.cryptotradingplatformbackend.response.PaymentResponse;
import com.project.cryptotradingplatformbackend.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WalletController {

    private final WalletService walletService;
    private final UserService userService;
    private final OrderService orderService;
    private final PaymentService paymentService;
    private final WalletTransactionService walletTransactionService;

    public WalletController(WalletService walletService, UserService userService, OrderService orderService, PaymentService paymentService, WalletTransactionService walletTransactionService) {
        this.walletService = walletService;
        this.userService = userService;
        this.orderService = orderService;
        this.paymentService = paymentService;
        this.walletTransactionService = walletTransactionService;
    }

    @GetMapping("/api/wallet")
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/wallet/transactions")
    public ResponseEntity<List<WalletTransaction>> getWalletTransaction(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        List<WalletTransaction> transactions = walletTransactionService.getTransactions(wallet, null);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PutMapping("/api/wallet/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(@RequestHeader("Authorization") String jwt, @PathVariable Long walletId, @RequestBody WalletTransaction req) throws Exception {
        User sender = userService.findUserProfileByJwt(jwt);
        Wallet receiverWallet = walletService.findWalletById(walletId);
        Wallet wallet = walletService.walletToWalletTransfer(sender, receiverWallet, req.getAmount());

        walletTransactionService.createWalletTransaction(
                wallet,
                WalletTransactionType.WALLET_TRANSFER,
                receiverWallet.getId().toString(),
                req.getPurpose(),
                -req.getAmount()
        );

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/wallet/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.getOrderById(orderId);
        Wallet wallet = walletService.payOrderPayment(order, user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/wallet/deposit")
    public ResponseEntity<Wallet> addMoneyToWallet(@RequestHeader("Authorization") String jwt, @RequestParam(name="order_id") Long orderId, @RequestParam(name="payment_id") String paymentId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);

        PaymentOrder paymentOrder = paymentService.getPaymentOrderById(orderId);
        boolean status = paymentService.proceedPaymentOrder(paymentOrder, paymentId);

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setPaymentUrl("deposit success");

        if(status) {
            wallet = walletService.addBalanceToWallet(wallet, paymentOrder.getAmount());
        }

        return new ResponseEntity<>(wallet, HttpStatus.OK);
    }
}
