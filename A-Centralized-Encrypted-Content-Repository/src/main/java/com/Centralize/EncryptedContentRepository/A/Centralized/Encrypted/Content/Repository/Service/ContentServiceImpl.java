package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Service;

import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.Content;
import org.springframework.stereotype.Service;

@Service
public interface ContentServiceImpl {

    public Content saveContent(String imageName, String image, String description);

    byte[] getEncryptedImageDataById(Long id);
}
