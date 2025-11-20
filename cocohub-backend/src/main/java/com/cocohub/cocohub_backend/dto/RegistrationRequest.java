package com.cocohub.cocohub_backend.dto;

import com.cocohub.cocohub_backend.model.UserType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegistrationRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;

    @NotBlank(message = "Display name is required")
    @Size(min = 1, max = 100, message = "Display name must be between 1 and 100 characters")
    private String displayName;

    @NotNull(message = "User type is required")
    private UserType userType;

    @Pattern(regexp = "^[0-9\\-\\+\\s]{7,20}$|^$", message = "Phone number must be valid format (7-20 characters)")
    private String phoneNumber;

    @Size(max = 100, message = "Province must not exceed 100 characters")
    private String province;
}