package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.WalletTransactionType;
import com.project.cryptotradingplatformbackend.modal.Wallet;
import com.project.cryptotradingplatformbackend.modal.WalletTransaction;
import com.project.cryptotradingplatformbackend.repository.WalletTransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

    private final WalletTransactionRepository walletTransactionRepo;

    public WalletTransactionServiceImpl(WalletTransactionRepository walletTransactionRepo) {
        this.walletTransactionRepo = walletTransactionRepo;
    }

    @Override
    public WalletTransaction createWalletTransaction(Wallet wallet, WalletTransactionType type, String transferId, String purpose, Long amount) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setType(type);
        transaction.setDate(LocalDate.now());
        transaction.setTransferId(transferId);
        transaction.setPurpose(purpose);
        transaction.setAmount(amount);

        return walletTransactionRepo.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactions(Wallet wallet, WalletTransactionType type) {
        return walletTransactionRepo.findByWalletOrderByDateDesc(wallet);
    }
}
