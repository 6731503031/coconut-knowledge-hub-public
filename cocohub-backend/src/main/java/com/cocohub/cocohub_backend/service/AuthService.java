package com.cocohub.cocohub_backend.service;

import com.cocohub.cocohub_backend.dto.RegistrationRequest;
import com.cocohub.cocohub_backend.model.User;
import com.cocohub.cocohub_backend.model.UserStatus;
import com.cocohub.cocohub_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; 

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID; 

import com.cocohub.cocohub_backend.dto.LoginRequest;
import com.cocohub.cocohub_backend.dto.LoginResponse;
import com.cocohub.cocohub_backend.security.JwtTokenProvider; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository; 
    @Autowired
    private PasswordEncoder passwordEncoder; 
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider tokenProvider;

    public User registerUser(RegistrationRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User newUser = new User();
        newUser.setUserId("U-" + UUID.randomUUID().toString());
        newUser.setEmail(request.getEmail());
        newUser.setDisplayName(request.getDisplayName());
        newUser.setUserType(request.getUserType());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setProvince(request.getProvince());
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        newUser.setPasswordHash(hashedPassword);
        newUser.setRegisteredDate(LocalDateTime.now());
        newUser.setStatus(UserStatus.Active); 
        return userRepository.save(newUser);
    }
    public LoginResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found after login?"));
        return new LoginResponse(jwt, user.getEmail(), user.getUserType());
    }
}    