package com.sirenah.backend.controller;

import com.sirenah.backend.model.DetallePedido;
import com.sirenah.backend.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/todosroles/DetallePedido")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoService detallePedidoService;

    @GetMapping("/Obtener")
    public ResponseEntity<List<DetallePedido>> obtenerTodos() {
        return ResponseEntity.ok(detallePedidoService.obtenerTodos());
    }

    @GetMapping("/ObtenerPorId/{id}")
    public ResponseEntity<DetallePedido> obtenerPorId(@PathVariable("id") Integer idDetallePedido) {
        return ResponseEntity.ok(detallePedidoService.obtenerPorId(idDetallePedido));
    }

    @PostMapping("/Guardar/{idPedido}")
    public ResponseEntity<DetallePedido> crear(@PathVariable Integer idPedido,
                                               @RequestParam Integer idProducto,
                                               @RequestParam String nombreProducto,
                                               @RequestParam Integer cantidad,
                                               @RequestParam BigDecimal precioUnitario) {
        return ResponseEntity.ok(detallePedidoService.addProductoToPedido(idPedido,idProducto,nombreProducto,cantidad,precioUnitario));
    }

    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<DetallePedido> actualizar(
            @PathVariable("id") Integer idDetallePedido,
            @RequestBody DetallePedido detallePedido) {
        return ResponseEntity.ok(detallePedidoService.actualizar(idDetallePedido, detallePedido));
    }

    @DeleteMapping("/Eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable("id") Integer idDetallePedido) {
        detallePedidoService.eliminar(idDetallePedido);
        return ResponseEntity.noContent().build();
    }
}
