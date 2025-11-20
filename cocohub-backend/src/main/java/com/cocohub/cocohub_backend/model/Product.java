package com.cocohub.cocohub_backend.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;
import java.util.HashSet;

@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "products")
public class Product {

    @Id
    @Column(length = 255)
    @EqualsAndHashCode.Include
    @ToString.Include
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(length = 100)
    private ProductCategory category;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(length = 50)
    private String unit;

    @Column(precision = 3, scale = 1)
    private BigDecimal rating;

    @Column(length = 1024)
    private String imageUrl;

    private Integer stockQuantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manufacturerId")
    @JsonIgnore
    private User manufacturer;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<ProductTranslation> translations = new HashSet<>();
}