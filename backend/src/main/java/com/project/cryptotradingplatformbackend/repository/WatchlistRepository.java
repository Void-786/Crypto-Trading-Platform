package com.project.cryptotradingplatformbackend.repository;

import com.project.cryptotradingplatformbackend.modal.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist,Long> {

    Watchlist findByUserId(Long userId);
}
