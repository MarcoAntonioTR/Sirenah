package com.sirenah.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sirenah.backend.model.Administrador;
import com.sirenah.backend.service.AdministradorService;

@RestController
@RequestMapping("/Administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    // Listar todos los administradores (GET)
    @GetMapping("/Listar")
    public ResponseEntity<List<Administrador>> Listar() {
        List<Administrador> administradores = administradorService.Listar();
        return ResponseEntity.ok(administradores);
    }

    // Crear un nuevo administrador (POST)
    @PostMapping("/AgregarAdmin")
    public ResponseEntity<Administrador> registrar(@RequestBody Administrador administrador) {
        Administrador nuevoAdmin = administradorService.agregar(administrador);
        return ResponseEntity.ok(nuevoAdmin);
    }

    // Buscar un administrador por su ID (GET)
    @GetMapping("/BuscarAdmin/{id}")
    public ResponseEntity<Administrador> buscarPorId(@PathVariable int id) {
        return administradorService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar un administrador (PUT)
    @PutMapping("/ActualizarAdmin/{id}")
    public ResponseEntity<Administrador> actualizar(@PathVariable int id, @RequestBody Administrador administradorDetalles) {
        return administradorService.buscarPorId(id).map(adminExistente -> {
            adminExistente.setNombre(administradorDetalles.getNombre());
            adminExistente.setApellido(administradorDetalles.getApellido());
            adminExistente.setEmail(administradorDetalles.getEmail());
            adminExistente.setContrasena(administradorDetalles.getContrasena());
            adminExistente.setTelefono(administradorDetalles.getTelefono());
            adminExistente.setBestado(administradorDetalles.isBestado());
            Administrador adminActualizado = administradorService.actualizar(adminExistente);
            return ResponseEntity.ok(adminActualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Eliminar un administrador (DELETE)
    @DeleteMapping("/EliminarAdmin/{id}")
    public ResponseEntity<Object> eliminar(@PathVariable int id) {
        return administradorService.buscarPorId(id).map(admin -> {
            administradorService.eliminar(id);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

}
