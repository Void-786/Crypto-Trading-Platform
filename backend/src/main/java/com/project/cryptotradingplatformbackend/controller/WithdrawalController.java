package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.domain.WalletTransactionType;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.modal.Wallet;
import com.project.cryptotradingplatformbackend.modal.Withdrawal;
import com.project.cryptotradingplatformbackend.service.UserService;
import com.project.cryptotradingplatformbackend.service.WalletService;
import com.project.cryptotradingplatformbackend.service.WalletTransactionService;
import com.project.cryptotradingplatformbackend.service.WithdrawalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class WithdrawalController {

    private final WithdrawalService withdrawalService;
    private final WalletService walletService;
    private final UserService userService;
    private final WalletTransactionService walletTransactionService;

    public WithdrawalController(WithdrawalService withdrawalService, WalletService walletService, UserService userService, WalletTransactionService walletTransactionService) {
        this.withdrawalService = withdrawalService;
        this.walletService = walletService;
        this.userService = userService;
        this.walletTransactionService = walletTransactionService;
    }

    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(@PathVariable Long amount, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);

        Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
        walletService.addBalanceToWallet(wallet, -withdrawal.getAmount());

        walletTransactionService.createWalletTransaction(wallet, WalletTransactionType.WITHDRAWAL, null, "Bank Account Withdrawl", withdrawal.getAmount());

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithdrawal(@PathVariable Long id, @PathVariable boolean accept, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Withdrawal withdrawal = withdrawalService.proceedWithdrawal(id, accept);
        Wallet wallet = walletService.getUserWallet(user);

        if(!accept) {
            walletService.addBalanceToWallet(wallet, withdrawal.getAmount());
        }

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @GetMapping("/api/withdrawal")
    public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Withdrawal> withdrawals = withdrawalService.getUserWithdrawalHistory(user);

        return new ResponseEntity<>(withdrawals, HttpStatus.OK);
    }

    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<Withdrawal>> getAllWithdrawalsRequest(@RequestHeader("Authorization") String jwt) throws Exception {
        userService.findUserProfileByJwt(jwt);
        List<Withdrawal> withdrawals = withdrawalService.getAllWithdrawalRequest();

        return new ResponseEntity<>(withdrawals, HttpStatus.OK);
    }
}
