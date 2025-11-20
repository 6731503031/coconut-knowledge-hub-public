package com.cocohub.cocohub_backend.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SecurityHeadersFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Prevent clickjacking attacks
        httpResponse.setHeader("X-Frame-Options", "DENY");

        // Prevent content-type sniffing
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");

        // Enable XSS protection in older browsers
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");

        // Content Security Policy - restrict resources to same origin
        httpResponse.setHeader("Content-Security-Policy",
                "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';");

        // Referrer Policy - don't send referrer to external sites
        httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

        // Strict Transport Security (HSTS) - force HTTPS (comment out if not using
        // HTTPS yet)
        // httpResponse.setHeader("Strict-Transport-Security", "max-age=31536000;
        // includeSubDomains");

        chain.doFilter(request, response);
    }
}
