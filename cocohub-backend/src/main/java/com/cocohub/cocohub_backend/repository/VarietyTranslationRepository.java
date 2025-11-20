package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.Variety;
import com.cocohub.cocohub_backend.model.VarietyTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VarietyTranslationRepository extends JpaRepository<VarietyTranslation, Long> {
    
    List<VarietyTranslation> findByVariety(Variety variety);

    List<VarietyTranslation> findByVarietyIdIn(List<Integer> varietyIds);
}