package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageName;
    private byte[] image;
    private String description;

    public byte[] getEncryptedImageData() {
        return image;
    }

    // Getters and setters

    // Constructors

    // Other methods
}
