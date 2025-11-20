package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.ArticleCategory;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ArticleListDTO {
    private String id;
    private String title; 
    private String author;
    private String imageUrl;
    private LocalDateTime publishDate;
    private ArticleCategory category;
}