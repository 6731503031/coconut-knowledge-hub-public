package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.Product;
import com.cocohub.cocohub_backend.model.ProductTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTranslationRepository extends JpaRepository<ProductTranslation, Long> {
    List<ProductTranslation> findByProduct(Product product);
    List<ProductTranslation> findByProductIdIn(List<String> productIds);
    List<ProductTranslation> findByLangCodeAndTitleContaining(String langCode, String titleKeyword);
}