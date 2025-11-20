package com.cocohub.cocohub_backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Table(name = "price")
@Data // สำหรับ Getters, Setters, toString, equals, hashCode (Lombok)
public class Price {
    
    // Primary Key ตรงกับตาราง SQL Dump ของคุณ
    @Id
    @Column(name = "date")
    private LocalDate date; 

    @Column(name = "central_price")
    private BigDecimal centralPrice;

    @Column(name = "northeast_price")
    private BigDecimal northeastPrice;

    @Column(name = "south_price")
    private BigDecimal southPrice;
}