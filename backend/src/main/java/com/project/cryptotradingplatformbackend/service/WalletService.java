package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.modal.Order;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.modal.Wallet;

public interface WalletService {

    Wallet getUserWallet(User user);

    Wallet addBalanceToWallet(Wallet wallet, Long money);

    Wallet findWalletById(Long Id) throws Exception;

    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, User user) throws Exception;
}
