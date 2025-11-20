package com.cocohub.cocohub_backend.service;

import com.cocohub.cocohub_backend.model.Product;
import com.cocohub.cocohub_backend.model.ProductCategory;
import com.cocohub.cocohub_backend.model.ProductTranslation;
import com.cocohub.cocohub_backend.model.User;
import com.cocohub.cocohub_backend.repository.ProductRepository;
import com.cocohub.cocohub_backend.dto.AddProductDTO;
import com.cocohub.cocohub_backend.dto.ProductDetailDTO;
import com.cocohub.cocohub_backend.dto.ProductListDTO;
import com.cocohub.cocohub_backend.repository.ProductTranslationRepository;
import com.cocohub.cocohub_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
// 1. [!!! เพิ่ม Import นี้ !!!] (นี่คือตัวแก้ Error)
import java.util.stream.Collectors;
import com.cocohub.cocohub_backend.model.Rating;
import com.cocohub.cocohub_backend.repository.RatingRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductTranslationRepository translationRepository;
    @Autowired
    private RatingRepository ratingRepository;

    // (Helper DTO - ถูกต้อง)
    private ProductListDTO convertToProductListDTO(Product product, String lang,
            Map<String, List<ProductTranslation>> translationsMap) {
        ProductListDTO dto = new ProductListDTO();
        dto.setId(product.getId());
        dto.setPrice(product.getPrice());
        dto.setRating(product.getRating());
        dto.setImageUrl(product.getImageUrl());
        dto.setCategory(product.getCategory());
        if (product.getManufacturer() != null) {
            try {
                dto.setManufacturerName(product.getManufacturer().getDisplayName());
                String contact = product.getManufacturer().getPhoneNumber();
                if (contact == null || contact.isEmpty())
                    contact = product.getManufacturer().getEmail();
                dto.setManufacturerContact(contact);
            } catch (EntityNotFoundException ex) {
                // manufacturer FK points to missing user; ignore manufacturer info
            }
        }
        // include unit for list view
        dto.setUnit(product.getUnit());
        List<ProductTranslation> translations = translationsMap.getOrDefault(product.getId(), Collections.emptyList());
        ProductTranslation translation = translations.stream()
                .filter(t -> t.getLangCode().equals(lang))
                .findFirst()
                .orElse(translations.stream().findFirst().orElse(null));
        if (translation != null) {
            dto.setName(translation.getTitle());
        }
        return dto;
    }

    // (getAllProducts - ถูกต้อง)
    public List<ProductListDTO> getAllProducts(String lang, String category, String search) {
        List<Product> products;
        if (category != null && !category.equalsIgnoreCase("All")) {
            try {
                ProductCategory productCategory = ProductCategory.valueOf(category);
                products = productRepository.findByCategory(productCategory);
            } catch (IllegalArgumentException e) {
                products = productRepository.findAll();
            }
        } else {
            products = productRepository.findAll();
        }
        if (products.isEmpty()) {
            return Collections.emptyList();
        }
        List<String> productIds = products.stream().map(Product::getId).collect(Collectors.toList());
        List<ProductTranslation> allTranslations = translationRepository.findByProductIdIn(productIds);

        // 2. (บรรทัดนี้คือบรรทัดที่ 60 - ตอนนี้ 'Collectors' ถูกต้องแล้ว)
        Map<String, List<ProductTranslation>> translationsMap = allTranslations.stream()
                .collect(Collectors.groupingBy(pt -> pt.getProduct().getId()));

        List<ProductListDTO> dtoList = products.stream()
                .map(product -> convertToProductListDTO(product, lang, translationsMap))
                .collect(Collectors.toList());
        if (search != null && !search.trim().isEmpty()) {
            String lowerCaseSearch = search.trim().toLowerCase();
            dtoList = dtoList.stream()
                    .filter(dto -> dto.getName() != null && dto.getName().toLowerCase().contains(lowerCaseSearch))
                    .collect(Collectors.toList());
        }
        return dtoList;
    }

    // (getProductById - ถูกต้อง)
    public Optional<ProductDetailDTO> getProductById(String id, String lang) {
        // ... (โค้ดเดิม) ...
        Optional<Product> productOpt = productRepository.findById(id);
        if (!productOpt.isPresent()) {
            return Optional.empty();
        }
        Product product = productOpt.get();
        List<ProductTranslation> translations = translationRepository.findByProduct(product);
        ProductTranslation translation = translations.stream()
                .filter(t -> t.getLangCode().equals(lang))
                .findFirst()
                .orElse(translations.stream().findFirst().orElse(null));
        ProductDetailDTO dto = new ProductDetailDTO();
        dto.setId(product.getId());
        dto.setCategory(product.getCategory());
        dto.setPrice(product.getPrice());
        dto.setUnit(product.getUnit());
        dto.setRating(product.getRating());
        dto.setImageUrl(product.getImageUrl());
        dto.setStockQuantity(product.getStockQuantity());
        if (product.getManufacturer() != null) {
            try {
                dto.setManufacturerName(product.getManufacturer().getDisplayName());
                dto.setManufacturerEmail(product.getManufacturer().getEmail());
                dto.setManufacturerPhone(product.getManufacturer().getPhoneNumber());
            } catch (EntityNotFoundException ex) {
                // manufacturer missing; leave manufacturer fields null
            }
        }
        if (translation != null) {
            dto.setName(translation.getTitle());
            dto.setDescription(translation.getDescription());
        }
        return Optional.of(dto);
    }

    // Add or update rating by user for a product; returns current average rating
    public BigDecimal addOrUpdateRating(String productId, String userEmail, Integer score) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Rating> existing = ratingRepository.findByProductAndUser(product, user);
        Rating rating;
        if (existing.isPresent()) {
            rating = existing.get();
            rating.setScore(score);
        } else {
            rating = new Rating();
            rating.setProduct(product);
            rating.setUser(user);
            rating.setScore(score);
        }
        ratingRepository.save(rating);

        // recompute average
        List<Rating> ratings = ratingRepository.findByProduct(product);
        double avg = ratings.stream().mapToInt(Rating::getScore).average().orElse(0.0);
        BigDecimal avgBd = BigDecimal.valueOf(avg).setScale(1, RoundingMode.HALF_UP);
        product.setRating(avgBd);
        productRepository.save(product);
        return avgBd;
    }

    // (getProductsByUser - ถูกต้อง)
    public List<ProductListDTO> getProductsByUser(String userEmail, String lang) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            return Collections.emptyList();
        }
        User user = userOpt.get();
        List<Product> products = productRepository.findByManufacturerUserId(user.getUserId());
        if (products.isEmpty())
            return Collections.emptyList();
        List<String> productIds = products.stream().map(Product::getId).collect(Collectors.toList());
        List<ProductTranslation> allTranslations = translationRepository.findByProductIdIn(productIds);
        Map<String, List<ProductTranslation>> translationsMap = allTranslations.stream()
                .collect(Collectors.groupingBy(pt -> pt.getProduct().getId()));
        return products.stream()
                .map(product -> convertToProductListDTO(product, lang, translationsMap))
                .collect(Collectors.toList());
    }

    // (addProduct - ถูกต้อง)
    public Product addProduct(AddProductDTO dto, String userEmail, String lang) {
        Optional<User> manufacturerOpt = userRepository.findByEmail(userEmail);
        if (manufacturerOpt.isEmpty()) {
            throw new RuntimeException(
                    "Authenticated user (manufacturer) not found in database for email: " + userEmail);
        }
        User manufacturer = manufacturerOpt.get();
        Product product = new Product();
        product.setId(UUID.randomUUID().toString());
        product.setManufacturer(manufacturer);
        product.setPrice(dto.getPrice());
        product.setUnit(dto.getUnit());
        product.setCategory(dto.getCategory());
        product.setStockQuantity(dto.getStockQuantity());
        // store imageUrl if provided by client (may be a relative path like
        // /uploads/..)
        if (dto.getImageUrl() != null && !dto.getImageUrl().isEmpty()) {
            product.setImageUrl(dto.getImageUrl());
        }
        ProductTranslation translation = new ProductTranslation();
        translation.setLangCode(lang);
        translation.setTitle(dto.getName());
        translation.setDescription(dto.getDescription());
        translation.setProduct(product);
        product.setTranslations(new HashSet<>(Arrays.asList(translation)));
        return productRepository.save(product);
    }

    // (deleteProduct - ถูกต้อง)
    public void deleteProduct(String productId, String userEmail) {
        // ... (โค้ดเดิม) ...
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        if (!product.getManufacturer().getEmail().equals(userEmail)) {
            throw new SecurityException("User does not own this product!");
        }
        productRepository.delete(product);
    }
}