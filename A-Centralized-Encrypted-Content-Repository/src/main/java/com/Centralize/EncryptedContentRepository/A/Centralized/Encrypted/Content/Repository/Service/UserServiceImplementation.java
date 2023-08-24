package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Service;

import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.User;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Model.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserServiceImplementation {

    public User registerUser(UserModel user);

    public User loginUser(String username, String password);
}
