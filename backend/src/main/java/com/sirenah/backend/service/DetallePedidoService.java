package com.sirenah.backend.service;

import com.sirenah.backend.model.DetallePedido;

import java.util.List;

public interface DetallePedidoService {

    List<DetallePedido> obtenerTodos();


    DetallePedido obtenerPorId(Integer idDetallePedido);


    DetallePedido crear(DetallePedido detallePedido);


    DetallePedido actualizar(Integer idDetallePedido, DetallePedido detallePedido);


    void eliminar(Integer idDetallePedido);
}
