package com.cocohub.cocohub_backend.controller;

import com.cocohub.cocohub_backend.model.Product;
import com.cocohub.cocohub_backend.service.ProductService;
import com.cocohub.cocohub_backend.dto.ProductDetailDTO;
import com.cocohub.cocohub_backend.dto.ProductListDTO;
import com.cocohub.cocohub_backend.dto.AddProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductListDTO> getAllProducts(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "lang") String lang,
            @RequestParam(name = "search", required = false) String search) {

        return productService.getAllProducts(lang, category, search);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> getProductById(
            @PathVariable String id,
            @RequestParam(name = "lang") String lang) {

        Optional<ProductDetailDTO> productDto = productService.getProductById(id, lang);

        if (productDto.isPresent()) {
            return ResponseEntity.ok(productDto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @Valid @RequestBody AddProductDTO dto,
            @RequestParam(name = "lang") String lang) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        Product savedProduct = productService.addProduct(dto, userEmail, lang);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<ProductListDTO>> getMyProducts(
            @RequestParam(name = "lang") String lang) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        List<ProductListDTO> myProducts = productService.getProductsByUser(userEmail, lang);
        return ResponseEntity.ok(myProducts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMyProduct(
            @PathVariable String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName(); // (วิธีนี้จะแก้ NPE)

        try {
            productService.deleteProduct(id, userEmail);
            return ResponseEntity.ok("Product deleted successfully.");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }

    }

    // Submit or update rating for a product (authenticated user)
    @PostMapping("/{id}/ratings")
    public ResponseEntity<?> submitRating(
            @PathVariable("id") String productId,
            @RequestBody Map<String, Object> body) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        try {
            Integer score = (Integer) body.get("score");
            if (score == null || score < 1 || score > 5) {
                return ResponseEntity.badRequest().body("Score must be between 1 and 5");
            }
            productService.addOrUpdateRating(productId, userEmail, score);
            return ResponseEntity.ok().build();
        } catch (ClassCastException e) {
            return ResponseEntity.badRequest().body("Invalid request body");
        }
    }

}