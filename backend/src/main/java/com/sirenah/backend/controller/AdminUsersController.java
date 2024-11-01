package com.sirenah.backend.controller;

import com.sirenah.backend.model.OurUsers;
import com.sirenah.backend.repository.OurUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sirenah.backend.dto.ProductoDTO;
import com.sirenah.backend.model.Producto;
import com.sirenah.backend.repository.ProductoRepository;

import java.util.Optional;

@RestController

public class AdminUsersController {

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private OurUserRepository ourUserRepository;

    @GetMapping("/public/product")
    public ResponseEntity<Object> Listar () {
        return ResponseEntity.ok(productoRepository.findAll());
    }

    @GetMapping("/adminuser/datos/{email}")
    public ResponseEntity<Object> getUserByEmail(@PathVariable String email) {
        Optional<OurUsers> ourUsers = ourUserRepository.findByEmail(email);
        return ResponseEntity.ok(ourUsers);
    }

    @GetMapping("/user/alone")
    public ResponseEntity<Object> userAlone () {
        return ResponseEntity.ok("Solo las usuarios pueden acceder a esta API solamente.");
    }
    @GetMapping("/adminuser/both")
    public ResponseEntity<Object> bothAdminaAndUsersApi () {
        return ResponseEntity.ok("Tanto el administrador como los usuarios pueden acceder a esta API");
    }


}
