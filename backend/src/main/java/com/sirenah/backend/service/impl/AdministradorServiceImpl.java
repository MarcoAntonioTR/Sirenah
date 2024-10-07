package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.Administrador;
import com.sirenah.backend.repository.AdministradorRepository;
import com.sirenah.backend.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorServiceImpl implements AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Override
    public List<Administrador> Listar() {
        return administradorRepository.findAll();
    }

    @Override
    public Administrador agregar(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    @Override
    public Administrador actualizar(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    @Override
    public Optional<Administrador> buscarPorId(int id) {
        return administradorRepository.findById(id);
    }

    @Override
    public void eliminar(int id) {
        administradorRepository.deleteById(id);
    }
}
