package com.cocohub.cocohub_backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {

    @Value("${uploads.dir:uploads}")
    private String uploadsDir;

    @PostConstruct
    public void init() throws IOException {
        Path dir = Paths.get(uploadsDir);
        if (!Files.exists(dir)) {
            Files.createDirectories(dir);
        }
    }

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded"));
        }

        String filenameRaw = file.getOriginalFilename();
        if (filenameRaw == null)
            filenameRaw = "file";
        String original = StringUtils.cleanPath(filenameRaw);
        String ext = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0)
            ext = original.substring(dot);
        String filename = UUID.randomUUID().toString() + ext;

        Path dest = Paths.get(uploadsDir).resolve(filename).toAbsolutePath();
        Files.copy(file.getInputStream(), dest);

        // Return a public URL path under the new public file endpoint
        String publicUrl = "/api/public/uploads/" + filename;
        Map<String, String> resp = new HashMap<>();
        resp.put("imageUrl", publicUrl);
        return ResponseEntity.ok(resp);
    }
}
