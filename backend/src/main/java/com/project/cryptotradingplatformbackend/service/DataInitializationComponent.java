package com.project.cryptotradingplatformbackend.service;

import com.project.cryptotradingplatformbackend.domain.USER_ROLE;
import com.project.cryptotradingplatformbackend.modal.User;
import com.project.cryptotradingplatformbackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializationComponent implements CommandLineRunner {

    private final UserRepository userRepo;

    public DataInitializationComponent(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public void run(String... args) {
        initializeAdminUser();
    }

    private void initializeAdminUser() {
        String adminEmail = "faiz@gmail.com";

        if(userRepo.findByEmail(adminEmail) == null) {
            User adminUser = new User();

            adminUser.setFullName("Faiz Ullah Khan");
            adminUser.setEmail(adminEmail);
            adminUser.setPassword("faiz@123");
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);

            userRepo.save(adminUser);
        }
    }
}
