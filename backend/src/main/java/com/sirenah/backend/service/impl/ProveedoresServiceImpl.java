package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.Proveedores;
import com.sirenah.backend.repository.ProveedoresRepository;
import com.sirenah.backend.service.ProveedoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedoresServiceImpl implements ProveedoresService {

    @Autowired
    private ProveedoresRepository proveedoresRepository;

    @Override
    public List<Proveedores> Listar() {
        return proveedoresRepository.findAll();
    }

    @Override
    public Proveedores agregar(Proveedores proveedores) {
        return proveedoresRepository.save(proveedores);
    }

    @Override
    public Proveedores actualizar(Proveedores proveedores) {
        return proveedoresRepository.save(proveedores);
    }

    @Override
    public Optional<Proveedores> buscarPorId(int id) {
        return proveedoresRepository.findById(id);
    }

    @Override
    public void eliminar(int id) {
        proveedoresRepository.deleteById(id);
    }
}
