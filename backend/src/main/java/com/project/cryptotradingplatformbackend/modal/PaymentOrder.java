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

    @Enumerated(EnumType.STRING)
    private PaymentOrderStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @ManyToOne
    private User user;
}
