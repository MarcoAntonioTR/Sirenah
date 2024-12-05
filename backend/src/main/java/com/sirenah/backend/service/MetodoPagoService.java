package com.sirenah.backend.service;

import com.sirenah.backend.model.MetodoPago;

import java.util.List;
import java.util.Optional;

public interface MetodoPagoService {
    MetodoPago guardarMetodoPago(MetodoPago metodoPago);
    Optional<MetodoPago> buscarPorId(Integer id);
    List<MetodoPago> listarTodos();
}
