package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.Variety;
import com.cocohub.cocohub_backend.model.VarietyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VarietyRepository extends JpaRepository<Variety, Integer> { 
    List<Variety> findByType(VarietyType type);
}