package com.cocohub.cocohub_backend.service;

import com.cocohub.cocohub_backend.dto.VarietyDetailDTO;
import com.cocohub.cocohub_backend.dto.VarietyListDTO;
import com.cocohub.cocohub_backend.model.Variety;
import com.cocohub.cocohub_backend.model.VarietyTranslation;
import com.cocohub.cocohub_backend.model.VarietyType;
import com.cocohub.cocohub_backend.repository.VarietyRepository;
import com.cocohub.cocohub_backend.repository.VarietyTranslationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VarietyService {

    @Autowired
    private VarietyRepository varietyRepository;

    @Autowired
    private VarietyTranslationRepository translationRepository;

    private VarietyListDTO convertToVarietyListDTO(Variety variety, String lang,
            Map<Integer, List<VarietyTranslation>> translationsMap) {
        VarietyListDTO dto = new VarietyListDTO();
        dto.setId(variety.getId());
        dto.setType(variety.getType());
        dto.setImageUrl(variety.getImageUrl());

        List<VarietyTranslation> translations = translationsMap.getOrDefault(variety.getId(), Collections.emptyList());

        VarietyTranslation translation = translations.stream()
                .filter(t -> t.getLangCode().equals(lang))
                .findFirst()
                .orElse(translations.stream().findFirst().orElse(null));

        if (translation != null) {
            dto.setName(translation.getName());
            if (translation.getImageUrl() != null && !translation.getImageUrl().isEmpty()) {
                dto.setImageUrl(translation.getImageUrl());
            }
        }
        return dto;
    }

    public List<VarietyListDTO> getAllVarieties(String lang, String type, String search) {

        List<Variety> varieties;

        if (type != null && !type.equalsIgnoreCase("All")) {
            try {
                VarietyType varietyType = VarietyType.valueOf(type);
                varieties = varietyRepository.findByType(varietyType);
            } catch (IllegalArgumentException e) {
                varieties = varietyRepository.findAll();
            }
        } else {
            varieties = varietyRepository.findAll();
        }

        if (varieties.isEmpty()) {
            return Collections.emptyList();
        }

        List<Integer> varietyIds = varieties.stream().map(Variety::getId).collect(Collectors.toList());
        List<VarietyTranslation> allTranslations = translationRepository.findByVarietyIdIn(varietyIds);

        Map<Integer, List<VarietyTranslation>> translationsMap = allTranslations.stream()
                .collect(Collectors.groupingBy(pt -> pt.getVariety().getId()));

        List<VarietyListDTO> dtoList = varieties.stream()
                .map(variety -> convertToVarietyListDTO(variety, lang, translationsMap))
                .collect(Collectors.toList());

        if (search != null && !search.trim().isEmpty()) {
            String lowerCaseSearch = search.trim().toLowerCase();
            dtoList = dtoList.stream()
                    .filter(dto -> dto.getName() != null && dto.getName().toLowerCase().contains(lowerCaseSearch))
                    .collect(Collectors.toList());
        }

        return dtoList;
    }

    public Optional<VarietyDetailDTO> getVarietyById(Integer id, String lang) {

        Optional<Variety> varietyOpt = varietyRepository.findById(id);

        if (!varietyOpt.isPresent()) {
            return Optional.empty();
        }

        Variety variety = varietyOpt.get();

        List<VarietyTranslation> translations = translationRepository.findByVariety(variety);

        VarietyTranslation translation = translations.stream()
                .filter(t -> t.getLangCode().equals(lang))
                .findFirst()
                .orElse(translations.stream().findFirst().orElse(null));

        VarietyDetailDTO dto = new VarietyDetailDTO();
        dto.setId(variety.getId());
        dto.setType(variety.getType());
        dto.setClimateZone(variety.getClimateZone());
        dto.setImageUrl(variety.getImageUrl());
        dto.setMapImageUrl(variety.getMapImageUrl());
        dto.setOriginStory(variety.getOriginStory());
        if (translation != null) {
            dto.setName(translation.getName());
            dto.setDescription(translation.getDetails());
            dto.setUsage(translation.getOriginStory());
            if (translation.getImageUrl() != null && !translation.getImageUrl().isEmpty()) {
                dto.setImageUrl(translation.getImageUrl());
            }
            if (translation.getMapImageUrl() != null && !translation.getMapImageUrl().isEmpty()) {
                dto.setMapImageUrl(translation.getMapImageUrl());
            }
            if (translation.getOriginStory() != null && !translation.getOriginStory().isEmpty()) {
                dto.setOriginStory(translation.getOriginStory());
            }
        }

        return Optional.of(dto);
    }
}