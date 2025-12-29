package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.OrderType;
import com.project.cryptotradingplatformbackend.modal.Order;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.modal.Wallet;
import com.project.cryptotradingplatformbackend.repository.WalletRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepo;

    public WalletServiceImpl(WalletRepository walletRepo) {
        this.walletRepo = walletRepo;
    }

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = walletRepo.findWalletByUserId(user.getId());

        if(wallet == null){
            wallet = new Wallet();
            wallet.setUser(user);
        }

        return walletRepo.save(wallet);
    }

    @Override
    public Wallet addBalanceToWallet(Wallet wallet, Long money) {
        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newBalance);

        return walletRepo.save(wallet);
    }

    @Override
    public Wallet findWalletById(Long Id) throws Exception {
        Optional<Wallet> wallet = walletRepo.findById(Id);

        if(wallet.isPresent()){
            return wallet.get();
        }

        throw new Exception("Wallet not found");
    }

    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception {
        Wallet senderWallet = getUserWallet(sender);
        if(senderWallet .getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new Exception("Insufficient balance");
        }

        BigDecimal senderNewBalance = senderWallet.getBalance().subtract(BigDecimal.valueOf(amount));
        senderWallet.setBalance(senderNewBalance);
        walletRepo.save(senderWallet);

        BigDecimal receiverNewBalance = receiverWallet.getBalance().add(BigDecimal.valueOf(amount));
        receiverWallet.setBalance(receiverNewBalance);
        walletRepo.save(receiverWallet);

        return senderWallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user) throws Exception {
        Wallet userWallet = getUserWallet(user);

        if(order.getOrderType().equals(OrderType.BUY)) {
            BigDecimal newBalance = userWallet.getBalance().subtract(order.getPrice());
            if(newBalance.compareTo(order.getPrice()) < 0) {
                throw new Exception("Insufficient balance");
            }
            userWallet.setBalance(newBalance);
        }
        else {
            BigDecimal newBalance = userWallet.getBalance().add(order.getPrice());
            userWallet.setBalance(newBalance);
        }
        walletRepo.save(userWallet);
        return userWallet;
    }
}
