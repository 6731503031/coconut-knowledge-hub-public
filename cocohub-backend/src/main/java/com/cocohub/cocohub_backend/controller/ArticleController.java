package com.cocohub.cocohub_backend.controller;

import com.cocohub.cocohub_backend.model.Article;
import com.cocohub.cocohub_backend.model.ArticleCategory;
import com.cocohub.cocohub_backend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cocohub.cocohub_backend.dto.ArticleDetailDTO;
import com.cocohub.cocohub_backend.dto.ArticleListDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:5173")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<ArticleListDTO> getAllArticles(
            @RequestParam(name = "lang") String lang,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "search", required = false) String search) {
        
        return articleService.getAllArticles(lang, category, search);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDetailDTO> getArticleById(
            @PathVariable String id, // (ID เป็น String)
            @RequestParam(name = "lang") String lang) {
        
        Optional<ArticleDetailDTO> dto = articleService.getArticleById(id, lang);
        
        return dto.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
}