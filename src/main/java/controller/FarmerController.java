package com.example.gamifiedsustainablefarming.controller;

import com.example.gamifiedsustainablefarming.entity.Farmer;
import com.example.gamifiedsustainablefarming.service.FarmerService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


@RestController
@CrossOrigin
@RequestMapping("/api/farmer")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Farmer farmer) {

        Farmer savedFarmer = farmerService.registerFarmer(farmer);

        if(savedFarmer == null){
            return ResponseEntity
                    .status(409)
                    .body("Email already exists");
        }

        return ResponseEntity.ok(savedFarmer);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Farmer farmer) {

        Farmer loggedFarmer = farmerService.loginFarmer(
                farmer.getEmail(),
                farmer.getPassword()
        );

        if(loggedFarmer != null) {
            return ResponseEntity.ok(loggedFarmer);
        }

        return ResponseEntity
                .status(401)
                .body("Invalid Email or Password");
    }


    @GetMapping("/profile/{email}")
    public Farmer getProfile(@PathVariable String email) {
        return farmerService.getFarmerByEmail(email);
    }

}