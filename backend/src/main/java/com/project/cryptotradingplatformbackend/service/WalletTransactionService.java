package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.WalletTransactionType;
import com.project.cryptotradingplatformbackend.modal.Wallet;
import com.project.cryptotradingplatformbackend.modal.WalletTransaction;

import java.util.List;

public interface WalletTransactionService {

    WalletTransaction createWalletTransaction(Wallet wallet, WalletTransactionType type, String transferId, String purpose, Long amount);

    List<WalletTransaction> getTransactions(Wallet wallet, WalletTransactionType type);
}
