package com.sirenah.backend.service;

import com.mercadopago.exceptions.MPException;

public interface PagoService {
    String crearPreferencia(Integer id) throws MPException;
}
