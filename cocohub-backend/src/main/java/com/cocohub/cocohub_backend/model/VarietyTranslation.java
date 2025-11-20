package com.cocohub.cocohub_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "variety_translations")
public class VarietyTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lang_code", nullable = false, length = 10)
    private String langCode;

    @Column(nullable = false)
    private String name;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String details; // (Field นี้ชื่อ 'details')

    @Lob
    @Column(name = "origin_story", columnDefinition = "TEXT")
    private String originStory; // (Field นี้ชื่อ 'originStory')

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "map_image_url")
    private String mapImageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variety_id")
    @JsonIgnore
    @ToString.Exclude
    private Variety variety;
}