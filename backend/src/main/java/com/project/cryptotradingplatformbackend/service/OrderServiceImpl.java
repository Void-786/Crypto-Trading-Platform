package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.OrderStatus;
import com.project.cryptotradingplatformbackend.domain.OrderType;
import com.project.cryptotradingplatformbackend.modal.*;
import com.project.cryptotradingplatformbackend.repository.AssetRepository;
import com.project.cryptotradingplatformbackend.repository.OrderItemRepository;
import com.project.cryptotradingplatformbackend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final WalletService walletService;
    private final AssetService assetService;
    private final AssetRepository assetRepo;


    public OrderServiceImpl(OrderRepository orderRepo, OrderItemRepository orderItemRepo, WalletService walletService, AssetService assetService, AssetRepository assetRepo) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.walletService = walletService;
        this.assetService = assetService;
        this.assetRepo = assetRepo;
    }

    @Override
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
        double price = orderItem.getCoin().getCurrent_price() * orderItem.getQuantity();
        Order order = new Order();
        order.setUser(user);
        order.setOrderItem(orderItem);
        order.setOrderType(orderType);
        order.setPrice(BigDecimal.valueOf(price));
        order.setTimestamp(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.PENDING);

        return orderRepo.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) throws Exception {
        return orderRepo.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
    }

    @Override
    public List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol) {
        return orderRepo.findByUserId(userId);
    }

    @Override
    @Transactional
    public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception {
        if(orderType.equals(OrderType.BUY)) {
            return buyAsset(coin, quantity, user);
        } else if (orderType.equals(OrderType.SELL)) {
            return sellAsset(coin, quantity, user);
        }
        throw new Exception("Order type not supported");
    }

    @Transactional
    public Order buyAsset(Coin coin, double quantity, User user) throws Exception {
        if(quantity < 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        double buyPrice = coin.getCurrent_price();
        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0);
        Order order = createOrder(user, orderItem, OrderType.BUY);
        orderItem.setOrder(order);

        walletService.payOrderPayment(order, user);

        order.setOrderStatus(OrderStatus.SUCCESS);
        order.setOrderType(OrderType.BUY);

        Order savedOrder = orderRepo.save(order);

        Asset asset = assetService.findAssetByUserIdAndCoinId(user.getId(), order.getOrderItem().getCoin().getId());

        if(asset == null) {
            assetService.createAsset(user, orderItem.getCoin(), orderItem.getQuantity());
        } else {
            assetService.updateAsset(asset.getId(), quantity);
        }

        return savedOrder;
    }

    @Transactional
    public Order sellAsset(Coin coin, double quantity, User user) throws Exception {
        Asset assetToSell = assetService.findAssetByUserIdAndCoinId(user.getId(), coin.getId());
        double sellPrice = coin.getCurrent_price();
        double buyPrice = assetToSell.getBuyPrice();

        if(assetToSell != null) {
            OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, sellPrice);
            Order order = createOrder(user, orderItem, OrderType.SELL);
            orderItem.setOrder(order);

            if(assetToSell.getQuantity() >= quantity) {
                order.setOrderStatus(OrderStatus.SUCCESS);
                order.setOrderType(OrderType.SELL);

                Order savedOrder = orderRepo.save(order);

                walletService.payOrderPayment(order, user);

                Asset updatedAsset = assetService.updateAsset(assetToSell.getId(), -quantity);
                if(updatedAsset.getQuantity() * coin.getCurrent_price() <= 1) {
                    assetService.deleteAsset(updatedAsset.getId());
                }

                return savedOrder;
            }
            throw new Exception("Insufficient asset quantity to sell");
        }
        throw new Exception("Asset not found for the user");
    }

    private OrderItem createOrderItem(Coin coin, double quantity, double buyPrice, double sellPrice) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyPrice(buyPrice);
        orderItem.setSellPrice(sellPrice);

        return orderItemRepo.save(orderItem);
    }
}
