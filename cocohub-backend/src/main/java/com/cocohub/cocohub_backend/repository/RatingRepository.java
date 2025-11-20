package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.Rating;
import com.cocohub.cocohub_backend.model.Product;
import com.cocohub.cocohub_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByProduct(Product product);

    Optional<Rating> findByProductAndUser(Product product, User user);
}
