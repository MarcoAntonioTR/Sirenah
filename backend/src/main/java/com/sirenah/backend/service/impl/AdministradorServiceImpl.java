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

}
