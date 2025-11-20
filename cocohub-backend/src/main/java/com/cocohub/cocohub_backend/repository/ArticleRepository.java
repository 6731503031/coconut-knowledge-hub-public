package com.cocohub.cocohub_backend.repository;
import com.cocohub.cocohub_backend.model.Article;
import com.cocohub.cocohub_backend.model.ArticleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, String>{
    List<Article> findByCategory(ArticleCategory category);
}
