// src/main/java/com/cocohub/cocohub_backend/dto/VarietyListDTO.java
package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.VarietyType;
import lombok.Data;

@Data
public class VarietyListDTO {
    private Integer id;
    private String name;
    private VarietyType type;
    private String imageUrl;
}