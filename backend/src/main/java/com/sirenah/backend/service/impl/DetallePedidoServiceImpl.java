package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.DetallePedido;
import com.sirenah.backend.model.Pedido;
import com.sirenah.backend.repository.DetallePedidoRepository;
import com.sirenah.backend.repository.PedidoRepository;
import com.sirenah.backend.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class DetallePedidoServiceImpl implements DetallePedidoService {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public List<DetallePedido> obtenerTodos() {
        return detallePedidoRepository.findAll();
    }

    @Override
    public DetallePedido obtenerPorId(Integer idDetallePedido) {
        return detallePedidoRepository.findById(idDetallePedido)
                .orElseThrow(() -> new RuntimeException("DetallePedido no encontrado con ID: " + idDetallePedido));
    }

    public DetallePedido addProductoToPedido(Integer idPedido, Integer idProducto,String nombreProducto, Integer cantidad, BigDecimal precioUnitario) {
        // Buscar el pedido
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        Optional<DetallePedido> detalleExistente = pedido.getDetalles().stream()
                .filter(detalle -> detalle.getIdProducto().equals(idProducto))
                .findFirst();

        if (detalleExistente.isPresent()) {
            // Si ya existe, actualizamos la cantidad y el subtotal
            DetallePedido detalle = detalleExistente.get();
            detalle.setCantidad(detalle.getCantidad() + cantidad);
            detalle.setSubtotal(detalle.getPrecioUnitario().multiply(new BigDecimal(detalle.getCantidad())));
            return detallePedidoRepository.save(detalle);
        } else {
            // Si no existe, creamos un nuevo detalle
            DetallePedido nuevoDetalle = new DetallePedido();
            nuevoDetalle.setPedido(pedido);
            nuevoDetalle.setIdProducto(idProducto);
            nuevoDetalle.setNombreProducto(nombreProducto);
            nuevoDetalle.setCantidad(cantidad);
            nuevoDetalle.setPrecioUnitario(precioUnitario);
            nuevoDetalle.setSubtotal(precioUnitario.multiply(new BigDecimal(cantidad)));
            return detallePedidoRepository.save(nuevoDetalle);
        }
    }



    @Override
    public DetallePedido actualizar(Integer idDetallePedido, DetallePedido detallePedido) {
        DetallePedido existente = obtenerPorId(idDetallePedido);
        existente.setPedido(detallePedido.getPedido());
        existente.setIdProducto(detallePedido.getIdProducto());
        existente.setNombreProducto(detallePedido.getNombreProducto());
        existente.setCantidad(detallePedido.getCantidad());
        existente.setPrecioUnitario(detallePedido.getPrecioUnitario());
        existente.setSubtotal(detallePedido.getSubtotal());
        return detallePedidoRepository.save(existente);
    }

    @Override
    public void eliminar(Integer idDetallePedido) {
        DetallePedido existente = obtenerPorId(idDetallePedido);
        detallePedidoRepository.delete(existente);
    }
}
