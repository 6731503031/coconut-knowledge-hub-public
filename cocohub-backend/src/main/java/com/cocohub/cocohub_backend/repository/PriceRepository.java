package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PriceRepository extends JpaRepository<Price, LocalDate> {

    List<Price> findByDateBetweenOrderByDateAsc(LocalDate startDate, LocalDate endDate);
}