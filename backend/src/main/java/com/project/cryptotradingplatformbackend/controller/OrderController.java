package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.domain.OrderType;
import com.project.cryptotradingplatformbackend.modal.Coin;
import com.project.cryptotradingplatformbackend.modal.Order;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.request.CreateOrderRequest;
import com.project.cryptotradingplatformbackend.service.CoinService;
import com.project.cryptotradingplatformbackend.service.OrderService;
import com.project.cryptotradingplatformbackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CoinService coinService;

    public OrderController(OrderService orderService, UserService userService, CoinService coinService) {
        this.orderService = orderService;
        this.userService = userService;
        this.coinService = coinService;
    }

    @PostMapping("/pay")
    public ResponseEntity<Order> pay(@RequestHeader("Authorization") String jwt, @RequestBody CreateOrderRequest req) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(req.getCoinId());

        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.getOrderById(orderId);

        if (order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.ok(order);
        } else {
            throw new Exception("Unauthorized access to order");
        }
    }

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersOfUser(@RequestHeader("Authorization") String jwt,
                                                          @RequestParam(required = false) OrderType orderType,
                                                          @RequestParam(required = false) String assetSymbol
    ) throws Exception {

        Long userId = userService.findUserProfileByJwt(jwt).getId();
        List<Order> orders = orderService.getAllOrdersOfUser(userId, orderType, assetSymbol);
        return ResponseEntity.ok(orders);
    }
}
