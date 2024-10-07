package com.sirenah.backend.service;

import com.sirenah.backend.model.Categoria;

import java.util.List;
import java.util.Optional;

public interface CategoriaService {
    List<Categoria> Listar();
    Categoria agregar(Categoria categoria);
    Categoria actualizar(Categoria categoria);
    Optional<Categoria> buscarPorId(int id);
    void eliminar(int id);
}
