package com.project.cryptotradingplatformbackend.modal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.cryptotradingplatformbackend.domain.USER_ROLE;
import com.project.cryptotradingplatformbackend.domain.UserStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String mobile;

    private String picture;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.PENDING;

    private boolean isVerified = false;

    @Embedded
    private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();

    @Enumerated(EnumType.STRING)
    private USER_ROLE role =  USER_ROLE.ROLE_USER;
}
