package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.modal.Coin;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.modal.Watchlist;
import com.project.cryptotradingplatformbackend.repository.WatchlistRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchlistService {

    private final WatchlistRepository watchlistRepo;

    public WatchlistServiceImpl(WatchlistRepository watchlistRepo) {
        this.watchlistRepo = watchlistRepo;
    }

    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {
        Watchlist watchlist = watchlistRepo.findByUserId(userId);
        if (watchlist == null) {
            throw new Exception("Watchlist not found");
        }
        return watchlist;
    }

    @Override
    public void createWatchlist(User user) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);

        watchlistRepo.save(watchlist);
    }

    @Override
    public Watchlist findById(Long id) throws Exception {
        Optional<Watchlist> watchlist = watchlistRepo.findById(id);
        if (watchlist.isEmpty()) {
            throw new Exception("Watchlist not found");
        }
        return watchlist.get();
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        Watchlist watchlist = findUserWatchlist(user.getId());
        if(watchlist.getCoins().contains(coin)) {
            watchlist.getCoins().remove(coin);
        }
        else {
            watchlist.getCoins().add(coin);
        }
        watchlistRepo.save(watchlist);
        return coin;
    }
}
