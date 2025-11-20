// src/main/java/com/cocohub/cocohub_backend/dto/VarietyDetailDTO.java
package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.VarietyType;
import lombok.Data;

@Data
public class VarietyDetailDTO {
    private Integer id;
    private VarietyType type;
    private String climateZone;

    private String name;
    private String description;
    private String usage;
    private String imageUrl;
    private String mapImageUrl;
    private String originStory;
}