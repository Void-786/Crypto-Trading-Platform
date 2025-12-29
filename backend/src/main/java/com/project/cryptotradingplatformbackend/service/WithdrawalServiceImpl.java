package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.WithdrawalStatus;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.modal.Withdrawal;
import com.project.cryptotradingplatformbackend.repository.WithdrawalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    private final WithdrawalRepository withdrawalRepo;

    public WithdrawalServiceImpl(WithdrawalRepository withdrawalRepo) {
        this.withdrawalRepo = withdrawalRepo;
    }

    @Override
    public Withdrawal requestWithdrawal(Long amount, User user) {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setUser(user);
        withdrawal.setWithdrawalStatus(WithdrawalStatus.PENDING);

        return withdrawalRepo.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception {
        Optional<Withdrawal> withdrawal = withdrawalRepo.findById(withdrawalId);
        if(withdrawal.isEmpty()) {
            throw new Exception("Withdrawal request not found");
        }

        Withdrawal withdrawalRequest = withdrawal.get();
        withdrawalRequest.setDate(LocalDateTime.now());

        if(accept) {
            withdrawalRequest.setWithdrawalStatus(WithdrawalStatus.SUCCESS);
        }
        else {
            withdrawalRequest.setWithdrawalStatus(WithdrawalStatus.DECLINE);
        }

        return withdrawalRepo.save(withdrawalRequest);
    }

    @Override
    public List<Withdrawal> getUserWithdrawalHistory(User user) {
        return withdrawalRepo.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepo.findAll();
    }
}
