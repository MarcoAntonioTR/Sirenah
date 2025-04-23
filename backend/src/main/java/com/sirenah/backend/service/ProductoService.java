package com.sirenah.backend.service;

import com.sirenah.backend.model.Producto;

import java.util.List;
import java.util.Optional;

public interface ProductoService {
    List<Producto> Listar();
    Producto agregar(Producto producto);
    Producto actualizar(Producto producto);
    Optional<Producto> buscarPorId(int id);
    void eliminar(int id);
}
