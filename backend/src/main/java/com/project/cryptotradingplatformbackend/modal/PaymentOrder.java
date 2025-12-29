package com.project.cryptotradingplatformbackend.modal;

import com.project.cryptotradingplatformbackend.domain.PaymentMethod;
import com.project.cryptotradingplatformbackend.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long amount;

    private PaymentOrderStatus status;

    private PaymentMethod paymentMethod;

    @ManyToOne
    private User user;
}
