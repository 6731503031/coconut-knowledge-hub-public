package com.cocohub.cocohub_backend.controller;

import com.cocohub.cocohub_backend.dto.VarietyDetailDTO;
import com.cocohub.cocohub_backend.dto.VarietyListDTO;
import com.cocohub.cocohub_backend.service.VarietyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/varieties")
@CrossOrigin(origins = "http://localhost:5173")
public class VarietyController {

    @Autowired
    private VarietyService varietyService;

    // [!!! แก้ไข Method นี้ !!!] ให้รับ type และ search (ไม่บังคับ)
    @GetMapping
    public List<VarietyListDTO> getAllVarieties(
            @RequestParam(name = "lang") String lang,
            @RequestParam(name = "type", required = false) String type, 
            @RequestParam(name = "search", required = false) String search) { 
        
        return varietyService.getAllVarieties(lang, type, search); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<VarietyDetailDTO> getVarietyById(
            @PathVariable Integer id, 
            @RequestParam(name = "lang") String lang) {
        
        Optional<VarietyDetailDTO> dto = varietyService.getVarietyById(id, lang);
        
        return dto.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
}