package com.cocohub.cocohub_backend.controller;

import com.cocohub.cocohub_backend.dto.LoginRequest;
import com.cocohub.cocohub_backend.dto.LoginResponse;
import com.cocohub.cocohub_backend.dto.RegistrationRequest;
import com.cocohub.cocohub_backend.model.User;
import com.cocohub.cocohub_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {

        try {
            User registeredUser = authService.registerUser(registrationRequest);
            return ResponseEntity.ok("User registered successfully! User ID: " + registeredUser.getUserId());

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {

        try {
            LoginResponse loginResponse = authService.loginUser(loginRequest);
            return ResponseEntity.ok(loginResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Error: Invalid email or password");
        }
    }
}