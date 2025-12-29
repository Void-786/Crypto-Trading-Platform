package com.project.cryptotradingplatformbackend.repository;

import com.project.cryptotradingplatformbackend.modal.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
