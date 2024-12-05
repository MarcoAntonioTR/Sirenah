package com.sirenah.backend.service.impl;

import com.sirenah.backend.model.MetodoPago;
import com.sirenah.backend.repository.MetodoPagoRepository;
import com.sirenah.backend.service.MetodoPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class MetodoPagoServiceImpl implements MetodoPagoService {

    @Autowired
    private MetodoPagoRepository metodoPagoRepository;

    @Override
    public MetodoPago guardarMetodoPago(MetodoPago metodoPago) {
        return metodoPagoRepository.save(metodoPago);
    }

    @Override
    public Optional<MetodoPago> buscarPorId(Integer id) {
        return metodoPagoRepository.findById(id);
    }

    @Override
    public List<MetodoPago> listarTodos() {
        return metodoPagoRepository.findAll();
    }

}
