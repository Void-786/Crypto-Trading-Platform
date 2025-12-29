package com.project.cryptotradingplatformbackend.repository;

import com.project.cryptotradingplatformbackend.modal.Wallet;
import com.project.cryptotradingplatformbackend.modal.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByWalletOrderByDateDesc(Wallet wallet);
}
