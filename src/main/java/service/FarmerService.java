package com.example.gamifiedsustainablefarming.service;

import com.example.gamifiedsustainablefarming.entity.Farmer;
import com.example.gamifiedsustainablefarming.repository.FarmerRepository;
import org.springframework.stereotype.Service;

@Service
public class FarmerService {

    private final FarmerRepository farmerRepository;

    public FarmerService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    // Register Farmer
    public Farmer registerFarmer(Farmer farmer) {

        Farmer existingFarmer = farmerRepository.findByEmail(farmer.getEmail());

        if(existingFarmer != null){
            return null;
        }

        return farmerRepository.save(farmer);
    }

    // Login Farmer
    public Farmer loginFarmer(String email, String password) {

        System.out.println("Email received: " + email);

        Farmer farmer = farmerRepository.findByEmail(email);

        System.out.println("Farmer found: " + farmer);

        if (farmer != null && farmer.getPassword().equals(password)) {
            System.out.println("Login Success");
            return farmer;
        }

        System.out.println("Login Failed");
        return null;
    }

    // Get Farmer Profile
    public Farmer getFarmerByEmail(String email) {
        return farmerRepository.findByEmail(email);
    }
}