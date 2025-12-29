package com.project.cryptotradingplatformbackend.controller;

import com.project.cryptotradingplatformbackend.modal.Coin;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.modal.Watchlist;
import com.project.cryptotradingplatformbackend.service.CoinService;
import com.project.cryptotradingplatformbackend.service.UserService;
import com.project.cryptotradingplatformbackend.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;
    private final UserService userService;
    private final CoinService coinService;

    public WatchlistController(WatchlistService watchlistService, UserService userService, CoinService coinService) {
        this.watchlistService = watchlistService;
        this.userService = userService;
        this.coinService = coinService;
    }

    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());

        return ResponseEntity.ok(watchlist);
    }

    @GetMapping("/{watchlistId}")
    public ResponseEntity<Watchlist> getWatchlistById(@PathVariable Long watchlistId) throws Exception {
        Watchlist watchlist = watchlistService.findById(watchlistId);

        return ResponseEntity.ok(watchlist);
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(@RequestHeader("Authorization") String jwt, @PathVariable String coinId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(coinId);
        Coin addedCoin = watchlistService.addItemToWatchlist(coin, user);

        return ResponseEntity.ok(addedCoin);
    }
}
