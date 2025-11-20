package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.MarketPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MarketPriceRepository extends JpaRepository<MarketPrice, Integer> {

    List<MarketPrice> findByDateBetween(LocalDate startDate, LocalDate endDate);
}