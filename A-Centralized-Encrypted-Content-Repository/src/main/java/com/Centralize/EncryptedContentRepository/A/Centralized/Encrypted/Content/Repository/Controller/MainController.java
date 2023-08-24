package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Controller;

import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.Content;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity.User;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Model.UserModel;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Service.ContentServiceImpl;
import com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Service.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.bouncycastle.crypto.BufferedBlockCipher;
import org.bouncycastle.crypto.CipherParameters;
import org.bouncycastle.crypto.engines.AESFastEngine;
import org.bouncycastle.crypto.modes.AEADBlockCipher;
import org.bouncycastle.crypto.modes.GCMBlockCipher;
import org.bouncycastle.crypto.params.AEADParameters;
import org.bouncycastle.crypto.params.KeyParameter;
import org.bouncycastle.util.encoders.Base64;

import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class MainController {

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @Autowired
    private ContentServiceImpl contentService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel user) {
        try {

            User registeredUser = userServiceImplementation.registerUser(user);
            String userCookie = "userId=" + registeredUser.getId() + "; Max-Age=86400; Path=/"; // 24 hours
            System.out.println(userCookie);
            return ResponseEntity.ok()
                    .header("Set-Cookie", userCookie)
                    .body(registeredUser);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        try {
            User user = userServiceImplementation.loginUser(username, password);
            String userCookie = "userId=" + user.getId() + "; Max-Age=86400; Path=/"; // 2
            return ResponseEntity.ok()
                    .header("Set-Cookie", userCookie)
                    .body(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/content")
    public ResponseEntity<?> saveEncryptedContent(@RequestBody Map<String, String> contentData) {
        String imageName = contentData.get("imageName");
        String encryptedImageFile = contentData.get("encryptedImageFile");
        String imageDescription = contentData.get("imageDescription");

        System.out.println(encryptedImageFile);

        try {
            byte[] encryptedImageBytes = Base64.decode(encryptedImageFile);
            byte[] nonce = Base64.decode(contentData.get("nonce"));
            byte[] key = Base64.decode(contentData.get("key"));

            AEADBlockCipher cipher = new GCMBlockCipher(new AESFastEngine());
            CipherParameters params = new AEADParameters(new KeyParameter(key), 128, nonce);
            cipher.init(false, params);

            byte[] decryptedImageBytes = new byte[cipher.getOutputSize(encryptedImageBytes.length)];
            int len = cipher.processBytes(encryptedImageBytes, 0, encryptedImageBytes.length, decryptedImageBytes, 0);
            cipher.doFinal(decryptedImageBytes, len);

            String decryptedImage = new String(decryptedImageBytes);

            // Assuming you have a service for saving content to the database
            Content savedContent = contentService.saveContent(
                    imageName, decryptedImage, imageDescription
            );

            return ResponseEntity.ok("Content saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving content: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getEncryptedImage(@PathVariable Long id) {
        // Retrieve encrypted image data from the database
        byte[] encryptedImageData = contentService.getEncryptedImageDataById(id);

        // Return encrypted image data in the response
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Set appropriate content type
        return new ResponseEntity<>(encryptedImageData, headers, HttpStatus.OK);
    }
}
