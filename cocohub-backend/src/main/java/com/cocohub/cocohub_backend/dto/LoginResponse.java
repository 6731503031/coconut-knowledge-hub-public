package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.UserType;
import lombok.Data;

@Data
public class LoginResponse {
    
    private String jwtToken;
    private String email;
    private UserType userType; 
    public LoginResponse(String jwtToken, String email, UserType userType) {
        this.jwtToken = jwtToken;
        this.email = email;
        this.userType = userType;
    }
}