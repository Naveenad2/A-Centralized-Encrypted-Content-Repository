package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Service;

import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.User;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Model.UserModel;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser() {
        // Prepare test data
        UserModel userModel = new UserModel("testuser", "1234567890", "test@example.com", "password");
        User userEntity = new User();
        userEntity.setId(1L);
        userEntity.setUsername("testuser");
        userEntity.setPhonenumber("1234567890");
        userEntity.setEmail("test@example.com");
        userEntity.setPassword("hashedPassword"); // Set the expected hashed password here

        // Mock repository behavior
        when(userRepository.findByUsername(userModel.getUsername())).thenReturn(null);
        when(userRepository.save(any(User.class))).thenReturn(userEntity);

        // Call the service method
        User registeredUser = userService.registerUser(userModel);

        // Assertions
        assertNotNull(registeredUser);
        assertEquals(userEntity.getId(), registeredUser.getId());
        assertEquals(userEntity.getUsername(), registeredUser.getUsername());
        assertEquals(userEntity.getPhonenumber(), registeredUser.getPhonenumber());
        assertEquals(userEntity.getEmail(), registeredUser.getEmail());
        assertEquals(userEntity.getPassword(), registeredUser.getPassword());

        // Verify repository interactions
        verify(userRepository, times(1)).findByUsername(userModel.getUsername());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
