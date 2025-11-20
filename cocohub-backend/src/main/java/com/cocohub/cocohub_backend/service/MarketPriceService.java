package com.cocohub.cocohub_backend.service;

import com.cocohub.cocohub_backend.model.MarketPrice;
import com.cocohub.cocohub_backend.repository.MarketPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MarketPriceService {

    @Autowired
    private MarketPriceRepository marketPriceRepository;

    public List<MarketPrice> getPriceData(LocalDate startDate, LocalDate endDate) {
        return marketPriceRepository.findByDateBetween(startDate, endDate);
    }
}