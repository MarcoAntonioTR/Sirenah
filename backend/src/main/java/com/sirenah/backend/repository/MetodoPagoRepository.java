package com.sirenah.backend.repository;

import com.sirenah.backend.model.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Integer> {
    List<MetodoPago> findByPedidoIdCliente(Integer idCliente); // Asegúrate que la relación esté correctamente mapeada en Pedido

}
