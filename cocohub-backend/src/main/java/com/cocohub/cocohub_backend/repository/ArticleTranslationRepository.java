package com.cocohub.cocohub_backend.repository;

import com.cocohub.cocohub_backend.model.Article; 
import com.cocohub.cocohub_backend.model.ArticleTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; 
@Repository
public interface ArticleTranslationRepository extends JpaRepository<ArticleTranslation, Long> {
    
    List<ArticleTranslation> findByArticle(Article article);

    List<ArticleTranslation> findByArticleIdIn(List<String> articleIds);

    List<ArticleTranslation> findByLangCodeAndTitleContaining(String langCode, String titleKeyword);
}