package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.ProductCategory;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductListDTO {
    private String id;
    private String name;
    private BigDecimal price;
    private BigDecimal rating;
    private String imageUrl;
    private String unit;
    private ProductCategory category;
    // manufacturer info for UI (display name and contact/email)
    private String manufacturerName;
    private String manufacturerContact;
}