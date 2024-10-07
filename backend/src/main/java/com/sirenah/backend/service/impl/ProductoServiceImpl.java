package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.Producto;
import com.sirenah.backend.repository.ProductoRepository;
import com.sirenah.backend.service.ProductoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public List<Producto> Listar() {
        return productoRepository.findAll();
    }

    @Override
    public Producto agregar(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto actualizar(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Optional<Producto> buscarPorId(int id) {
        return productoRepository.findById(id);
    }

    @Override
    public void eliminar(int id) {
        productoRepository.deleteById(id);
    }
}
