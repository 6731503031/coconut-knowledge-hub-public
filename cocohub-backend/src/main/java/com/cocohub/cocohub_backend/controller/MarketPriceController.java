package com.cocohub.cocohub_backend.controller;

import com.cocohub.cocohub_backend.model.MarketPrice;
import com.cocohub.cocohub_backend.service.MarketPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/prices")
@CrossOrigin(origins = "http://localhost:5173")
public class MarketPriceController {

    @Autowired
    private MarketPriceService marketPriceService;

    @GetMapping
    public List<MarketPrice> getPrices(
          
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        return marketPriceService.getPriceData(startDate, endDate);
    }
}