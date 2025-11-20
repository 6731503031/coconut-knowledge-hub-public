package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.Product;
import com.cocohub.cocohub_backend.model.ProductCategory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    @Override
    List<Product> findAll();

    @Override
    Optional<Product> findById(String id);

    List<Product> findByCategory(ProductCategory category);

    List<Product> findByManufacturerUserId(String userId);

}