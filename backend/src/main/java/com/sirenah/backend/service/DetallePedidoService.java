package com.sirenah.backend.service;

import com.sirenah.backend.model.CarritoDetalle;
import com.sirenah.backend.model.DetallePedido;

import java.math.BigDecimal;
import java.util.List;

public interface DetallePedidoService {

    List<DetallePedido> obtenerTodos();


    DetallePedido obtenerPorId(Integer idDetallePedido);


    DetallePedido addProductoToPedido(Integer idPedido, Integer idProducto,String nombreProducto, Integer cantidad, BigDecimal precioUnitario);


    DetallePedido actualizar(Integer idDetallePedido, DetallePedido detallePedido);


    void eliminar(Integer idDetallePedido);
}
