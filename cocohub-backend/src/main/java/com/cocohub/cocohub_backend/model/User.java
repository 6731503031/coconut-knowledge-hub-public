package com.cocohub.cocohub_backend.model;

import jakarta.persistence.*;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "User")

public class User {

    @Id
    @Column(length = 255)
    @EqualsAndHashCode.Include
    @ToString.Include
    private String userId;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String passwordHash;

    @Column(length = 255)
    private String displayName;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private UserType userType;

    @Column(length = 50)
    private String phoneNumber;

    @Column(length = 100)
    private String province;

    private LocalDateTime registeredDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private UserStatus status;
}