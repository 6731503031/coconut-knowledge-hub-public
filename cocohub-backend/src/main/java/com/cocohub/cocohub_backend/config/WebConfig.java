package com.cocohub.cocohub_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${uploads.dir:uploads}")
    private String uploadsDir;

    @Autowired
    private RateLimitingInterceptor rateLimitingInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // อนุญาตทุก Path ใน API
                .allowedOrigins(
                        "https://coconut-knowledge-hub.netlify.app", // URL ของ Netlify (ต้องเป๊ะ ห้ามมี / ปิดท้าย)
                        "http://localhost:5173", // อนุญาต Localhost เผื่อไว้ Test
                        "http://localhost:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // อนุญาต Method เหล่านี้
                .allowedHeaders("*") // อนุญาตทุก Header
                .allowCredentials(true); // อนุญาตให้ส่ง Cookie/Auth ได้
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String absolute = Paths.get(uploadsDir).toAbsolutePath().toUri().toString();
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + absolute);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimitingInterceptor);
    }
}
