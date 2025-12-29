package com.project.cryptotradingplatformbackend.request;

import com.project.cryptotradingplatformbackend.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String coinId;
    private double quantity;
    private OrderType orderType;
}
