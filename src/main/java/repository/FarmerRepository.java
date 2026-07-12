package com.example.gamifiedsustainablefarming.repository;

import com.example.gamifiedsustainablefarming.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {

    Farmer findByEmail(String email);

}