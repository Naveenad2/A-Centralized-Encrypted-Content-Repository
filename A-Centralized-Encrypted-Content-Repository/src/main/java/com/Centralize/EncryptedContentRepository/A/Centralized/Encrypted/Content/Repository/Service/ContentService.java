package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Service;

import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.Content;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContentService implements ContentServiceImpl {

    private final ContentRepository contentRepository;

    @Autowired
    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }
    @Override
    public Content saveContent(String imageName, String image, String description) {
        Content content = new Content();
        content.setImageName(imageName);
        content.setImage(image.getBytes());
        content.setDescription(description);
        return contentRepository.save(content);
    }
    @Override
    public byte[] getEncryptedImageDataById(Long id) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        // Assuming you have a property in the Content entity to store encrypted data
        byte[] encryptedImageData = content.getEncryptedImageData();

        if (encryptedImageData == null) {
            throw new RuntimeException("Encrypted image data not found");
        }

        return encryptedImageData;
    }





    // You can add more methods here for other content-related operations

}