package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {


    private String username ;
    private String phonenumber ;

    private String email ;
    private String isdoctor ;

    private String password;

    public UserModel(String testuser, String s, String s1, String password) {
    }
}
