package com.Centralize.EncryptedContentRepository.A.Centralized.Encrypted.Content.Repository.Entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) // Enable auto-increment
    @Column(name = "id")
    private Long id;

    @Column(nullable = false,unique = true)
    private String username ;
    @Column(nullable = false,unique = true)
    private String phonenumber ;


    @Column(nullable = false,unique = true)
    private String email ;
    @Column(nullable = false)
    private String isdoctor ;


    @Column(nullable = false)
    private String password;

   // @PrePersist
  //  public void EncryptPassword(){
   //     BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    //    this.password = encoder.encode(this.password);
    //}
}
