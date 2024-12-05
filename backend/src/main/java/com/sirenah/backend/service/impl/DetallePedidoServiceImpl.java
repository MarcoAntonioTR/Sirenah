package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.DetallePedido;
import com.sirenah.backend.repository.DetallePedidoRepository;
import com.sirenah.backend.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetallePedidoServiceImpl implements DetallePedidoService {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Override
    public List<DetallePedido> obtenerTodos() {
        return detallePedidoRepository.findAll();
    }

    @Override
    public DetallePedido obtenerPorId(Integer idDetallePedido) {
        return detallePedidoRepository.findById(idDetallePedido)
                .orElseThrow(() -> new RuntimeException("DetallePedido no encontrado con ID: " + idDetallePedido));
    }

    @Override
    public DetallePedido crear(DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
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
