package com.sirenah.backend.controller;

import com.sirenah.backend.model.MetodoPago;
import com.sirenah.backend.service.MetodoPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todosroles/Pago")
public class MetodoPagoController {

    @Autowired
    private MetodoPagoService metodoPagoService;

    // Guardar un método de pago
    @PostMapping("/Guardar")
    public ResponseEntity<MetodoPago> guardarMetodoPago(@RequestBody MetodoPago metodoPago) {
        MetodoPago metodoGuardado = metodoPagoService.guardarMetodoPago(metodoPago);
        return ResponseEntity.ok(metodoGuardado);
    }

    // Buscar un método de pago por ID
    @GetMapping("/ObtenerPorId/{id}")
    public ResponseEntity<MetodoPago> buscarPorId(@PathVariable Integer id) {
        Optional<MetodoPago> metodoPago = metodoPagoService.buscarPorId(id);
        return metodoPago.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Listar todos los métodos de pago
    @GetMapping("/Obtener")
    public ResponseEntity<List<MetodoPago>> listarTodos() {
        List<MetodoPago> metodosPago = metodoPagoService.listarTodos();
        return ResponseEntity.ok(metodosPago);
    }

}
