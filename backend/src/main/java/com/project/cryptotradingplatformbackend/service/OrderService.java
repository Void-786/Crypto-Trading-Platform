package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.OrderType;
import com.project.cryptotradingplatformbackend.modal.Coin;
import com.project.cryptotradingplatformbackend.modal.Order;
import com.project.cryptotradingplatformbackend.modal.OrderItem;
import com.project.cryptotradingplatformbackend.modal.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
