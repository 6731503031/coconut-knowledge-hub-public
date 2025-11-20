package com.cocohub.cocohub_backend.service;

import com.cocohub.cocohub_backend.model.Price;
import com.cocohub.cocohub_backend.repository.PriceRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import java.util.List;

@Service
public class PriceService {

    @Autowired
    private PriceRepository priceRepository;


    public List<Price> getMarketPricesByDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate.isAfter(endDate)) {
            LocalDate temp = startDate;
            startDate = endDate;
            endDate = temp;
        }
        
        return priceRepository.findByDateBetweenOrderByDateAsc(startDate, endDate);
    }
}