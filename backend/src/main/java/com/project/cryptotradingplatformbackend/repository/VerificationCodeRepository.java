package com.project.cryptotradingplatformbackend.repository;

import com.project.cryptotradingplatformbackend.modal.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {

    VerificationCode findByUserId(long userId);
}
