package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Service;

import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.User;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Model.UserModel;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceImplementation{

    @Autowired
    private UserRepository userRepository;
    @Override
    public User registerUser(UserModel user) {

        // Check if the username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        User userClass = new User();
        BeanUtils.copyProperties(user,userClass);

        // Save the user to the database
        return userRepository.save(userClass);
    }

    @Override
    public User loginUser(String username, String password) {


        User user = userRepository.findByUsername(username);
        if (user != null) {

            if (user.getPassword().equals(password)) {

                return user;

            }
        }
        // Compare the provided password with the user's password
       throw new RuntimeException("User not found");

    }
}
