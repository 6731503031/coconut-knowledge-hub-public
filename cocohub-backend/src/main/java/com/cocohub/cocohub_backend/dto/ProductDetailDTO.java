package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.ProductCategory;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDetailDTO {

    private String id;
    private ProductCategory category;
    private BigDecimal price;
    private String unit;
    private BigDecimal rating;
    private String imageUrl;
    private Integer stockQuantity;

    private String name;
    private String description;
    // manufacturer info
    private String manufacturerName;
    private String manufacturerEmail;
    private String manufacturerPhone;
}