package com.cocohub.cocohub_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "article_translations") 
public class ArticleTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(name = "lang_code", nullable = false, length = 10)
    private String langCode; 

    @Column(nullable = false)
    private String title; 

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content; 

    @Column(length = 500)
    private String summary; 


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id") 
    @JsonIgnore
    @ToString.Exclude
    private Article article;
}