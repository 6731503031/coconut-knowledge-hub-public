package com.cocohub.cocohub_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Data
@Entity
@Table(name = "articles")
public class Article {
    @Id
    @Column(length = 255)
    private String id;

    @Column(nullable = false, length = 512)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(length = 100)
    private ArticleCategory category;

    @Column(length = 255)
    private String author;

    private LocalDateTime publishDate;

    @Column(length = 1024)
    private String imageUrl;

    @Column(length = 1024)
    private String externalUrl;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<ArticleTranslation> translations = new HashSet<>();
}
