package com.sirenah.backend.service;

import com.sirenah.backend.model.Proveedores;

import java.util.List;
import java.util.Optional;

public interface ProveedoresService {
    List<Proveedores> Listar();
    Proveedores agregar(Proveedores proveedores);
    Proveedores actualizar(Proveedores proveedores);
    Optional<Proveedores> buscarPorId(int id);
    void eliminar(int id);
}
