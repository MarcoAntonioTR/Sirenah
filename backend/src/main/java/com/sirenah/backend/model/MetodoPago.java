package com.sirenah.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "metodo_pago")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class MetodoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPago;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "idTransaccion", unique = true, nullable = false, length = 100)
    private String idTransaccion;

    @Column(name = "moneda", nullable = false, length = 3)
    private String moneda;

    @Column(name = "fechaPago", nullable = false)
    private LocalDateTime fechaPago;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado;

    @OneToOne
    @JoinColumn(name = "idPedido", nullable = false)
    private Pedido pedido;
}
