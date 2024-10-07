package com.sirenah.backend.service;

import com.sirenah.backend.model.Administrador;

import java.util.List;
import java.util.Optional;

public interface AdministradorService {
    List<Administrador> Listar();
    Administrador agregar(Administrador administrador);
    Administrador actualizar(Administrador administrador);
    Optional<Administrador> buscarPorId(int id);
    void eliminar(int id);
}
