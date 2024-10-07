package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.Cliente;
import com.sirenah.backend.repository.ClienteRepository;
import com.sirenah.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Cliente> Listar() {
        return clienteRepository.findAll();
    }

    @Override
    public Cliente agregar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Override
    public Cliente actualizar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Override
    public Optional<Cliente> buscarPorId(int id) {
        return clienteRepository.findById(id);
    }

    @Override
    public void eliminar(int id) {
        clienteRepository.deleteById(id);
    }
}
