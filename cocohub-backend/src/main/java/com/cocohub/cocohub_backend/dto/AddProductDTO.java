package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.ProductCategory;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

@Data
public class AddProductDTO {
    @NotBlank(message = "Product name is required")
    @Size(min = 1, max = 255, message = "Product name must be between 1 and 255 characters")
    private String name;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be non-negative")
    private BigDecimal price;

    @NotBlank(message = "Unit is required")
    @Size(min = 1, max = 50, message = "Unit must be between 1 and 50 characters")
    private String unit;

    @NotNull(message = "Category is required")
    private ProductCategory category;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity must be non-negative")
    @Max(value = 1000000, message = "Stock quantity must not exceed 1000000")
    private int stockQuantity;

    private String imageUrl;
    // private String ingredients; (เผื่อคุณเพิ่มในอนาคต)
}