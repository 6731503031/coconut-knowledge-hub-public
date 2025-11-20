package com.cocohub.cocohub_backend.service;

import com.cocohub.cocohub_backend.model.User;
import com.cocohub.cocohub_backend.model.UserStatus;
import com.cocohub.cocohub_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserStatus(String userId, UserStatus newStatus) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        user.setStatus(newStatus);
        return userRepository.save(user);
    }

    public void deleteUser(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found!");
        }
        userRepository.deleteById(userId);
    }

}