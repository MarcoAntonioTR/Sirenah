package com.sirenah.backend.service;

import com.sirenah.backend.model.Direccion;

import java.util.List;
import java.util.Optional;

public interface DireccionService {
    List<Direccion> Listar();
    Direccion agregar(Direccion cliente);
    Direccion actualizar(Direccion cliente);
    Optional<Direccion> buscarPorId(int id);
    void eliminar(int id);
}
