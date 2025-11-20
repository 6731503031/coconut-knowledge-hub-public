package com.cocohub.cocohub_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "market_prices")
public class MarketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "price_date", nullable = false, unique = true)
    private LocalDate date; 

    @Column(name = "central_price")
    private BigDecimal centralPrice; 

    @Column(name = "south_price")
    private BigDecimal southPrice; 

    @Column(name = "northeast_price")
    private BigDecimal northeastPrice; 
}