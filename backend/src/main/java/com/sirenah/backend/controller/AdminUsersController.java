package com.sirenah.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sirenah.backend.dto.ProductoDTO;
import com.sirenah.backend.model.Producto;
import com.sirenah.backend.repository.ProductoRepository;

@RestController
public class AdminUsersController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping("/public/product")
    public ResponseEntity<Object> Listar () {
        return ResponseEntity.ok(productoRepository.findAll());
    }

    @PostMapping("/admin/saveproduct")
    public ResponseEntity<Object> signup (@RequestBody ProductoDTO productRequest) {
        Producto producto = new Producto();
        producto.setNombre(productRequest.getNombre());
        producto.setDescripcion(productRequest.getDescripcion());
        producto.setPrecio(productRequest.getPrecio());
        producto.setStockMinimo(productRequest.getStockMinimo());
        producto.setStock(productRequest.getStock());
        producto.setIdCategoria(productRequest.getIdCategoria());
        producto.setEstado(productRequest.isEstado());

        return ResponseEntity.ok(productoRepository.save(producto));
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
