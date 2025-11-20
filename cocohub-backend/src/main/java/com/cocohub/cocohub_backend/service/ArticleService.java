package com.cocohub.cocohub_backend.service;

import com.cocohub.cocohub_backend.dto.ArticleDetailDTO;
import com.cocohub.cocohub_backend.dto.ArticleListDTO;
import com.cocohub.cocohub_backend.model.Article;
import com.cocohub.cocohub_backend.model.ArticleCategory;
import com.cocohub.cocohub_backend.model.ArticleTranslation;
import com.cocohub.cocohub_backend.model.VarietyTranslation;
import com.cocohub.cocohub_backend.repository.ArticleRepository;
import com.cocohub.cocohub_backend.repository.ArticleTranslationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleTranslationRepository translationRepository;

    private ArticleListDTO convertToArticleListDTO(Article article, String lang,
            Map<String, List<ArticleTranslation>> translationsMap) {
        ArticleListDTO dto = new ArticleListDTO();
        dto.setId(article.getId());
        dto.setAuthor(article.getAuthor());
        dto.setCategory(article.getCategory());
        dto.setImageUrl(article.getImageUrl());
        dto.setPublishDate(article.getPublishDate());

        List<ArticleTranslation> translations = translationsMap.getOrDefault(article.getId(), Collections.emptyList());

        ArticleTranslation translation = translations.stream()
                .filter(t -> t.getLangCode().equals(lang))
                .findFirst()
                .orElse(translations.stream().findFirst().orElse(null));

        if (translation != null) {
            dto.setTitle(translation.getTitle());
        }
        return dto;
    }

    public List<ArticleListDTO> getAllArticles(String lang, String category, String search) {

        List<Article> articles;

        if (category != null && !category.equalsIgnoreCase("All")) {
            try {
                ArticleCategory articleCategory = ArticleCategory.valueOf(category);
                articles = articleRepository.findByCategory(articleCategory);
            } catch (IllegalArgumentException e) {
                articles = articleRepository.findAll();
            }
        } else {
            articles = articleRepository.findAll();
        }

        if (articles.isEmpty()) {
            return Collections.emptyList();
        }

        List<String> articleIds = articles.stream().map(Article::getId).collect(Collectors.toList());
        List<ArticleTranslation> allTranslations = translationRepository.findByArticleIdIn(articleIds);

        Map<String, List<ArticleTranslation>> translationsMap = allTranslations.stream()
                .collect(Collectors.groupingBy(pt -> pt.getArticle().getId()));

        List<ArticleListDTO> dtoList = articles.stream()
                .map(article -> convertToArticleListDTO(article, lang, translationsMap))
                .collect(Collectors.toList());

        if (search != null && !search.trim().isEmpty()) {
            String lowerCaseSearch = search.trim().toLowerCase();
            dtoList = dtoList.stream()
                    .filter(dto -> dto.getTitle() != null && dto.getTitle().toLowerCase().contains(lowerCaseSearch))
                    .collect(Collectors.toList());
        }

        return dtoList;
    }

    public Optional<ArticleDetailDTO> getArticleById(String id, String lang) {

        Optional<Article> articleOpt = articleRepository.findById(id);

        if (!articleOpt.isPresent()) {
            return Optional.empty();
        }

        Article article = articleOpt.get();
        List<ArticleTranslation> translations = translationRepository.findByArticle(article);

        ArticleTranslation translation = translations.stream()
                .filter(t -> t.getLangCode().equals(lang))
                .findFirst()
                .orElse(translations.stream().findFirst().orElse(null));

        ArticleDetailDTO dto = new ArticleDetailDTO();
        dto.setId(article.getId());
        dto.setAuthor(article.getAuthor());
        dto.setCategory(article.getCategory());
        dto.setImageUrl(article.getImageUrl());
        dto.setPublishDate(article.getPublishDate());
        dto.setExternalUrl(article.getExternalUrl());

        if (translation != null) {
            dto.setTitle(translation.getTitle());
            dto.setContent(translation.getContent());
        }

        return Optional.of(dto);
    }
}