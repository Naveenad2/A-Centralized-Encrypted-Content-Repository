package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Repository;

import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
}
