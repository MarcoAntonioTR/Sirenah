package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.Direccion;
import com.sirenah.backend.repository.DireccionRepository;
import com.sirenah.backend.service.DireccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DireccionServiceImpl implements DireccionService {

    @Autowired
    private DireccionRepository direccionRepository;

    @Override
    public List<Direccion> Listar() {
        return direccionRepository.findAll();
    }

    @Override
    public Direccion agregar(Direccion direccion) {
        return direccionRepository.save(direccion);
    }

    @Override
    public Direccion actualizar(Direccion direccion) {
        return direccionRepository.save(direccion);
    }

    @Override
    public Optional<Direccion> buscarPorId(int id) {
        return direccionRepository.findById(id);
    }

    @Override
    public void eliminar(int id) {
        direccionRepository.deleteById(id);
    }
}
