package com.cocohub.cocohub_backend.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingInterceptor implements HandlerInterceptor {

    private final Map<String, Bucket> cacheBuckets = new ConcurrentHashMap<>();

    /**
     * Rate limit: 10 requests per minute per IP
     */
    private Bucket resolveBucket(String clientIp) {
        return cacheBuckets.computeIfAbsent(clientIp, ip -> createNewBucket());
    }

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.classic(10, Refill.intervally(10, Duration.ofMinutes(1)));
        return Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // Apply rate limiting to login and upload endpoints
        String path = request.getRequestURI();
        if (path.contains("/api/auth/login") || path.contains("/api/uploads")) {
            String clientIp = getClientIp(request);
            Bucket bucket = resolveBucket(clientIp);

            if (!bucket.tryConsume(1)) {
                response.setStatus(429); // HTTP 429 Too Many Requests
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Rate limit exceeded. Max 10 requests per minute.\"}");
                return false;
            }
        }
        return true;
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
