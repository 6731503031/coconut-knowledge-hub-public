package com.cocohub.cocohub_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;
import java.util.HashSet;

@Data
@Entity
@Table(name = "varieties")
public class Variety {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private VarietyType type;

    private String climateZone;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "map_image_url")
    private String mapImageUrl;

    @Lob
    @Column(name = "origin_story", columnDefinition = "TEXT")
    private String originStory;

    @OneToMany(mappedBy = "variety", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<VarietyTranslation> translations = new HashSet<>();
}
