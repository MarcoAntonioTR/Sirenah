package com.sirenah.backend.service;

import com.sirenah.backend.model.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteService {
    List<Cliente> Listar();
    Cliente agregar(Cliente cliente);
    Cliente actualizar(Cliente cliente);
    Optional<Cliente> buscarPorId(int id);
    void eliminar(int id);
}
