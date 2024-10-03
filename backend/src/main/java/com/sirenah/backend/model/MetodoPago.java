package com.sirenah.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "metodo_pago")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MetodoPago {
    @Id
    private int idPago;

    @Column(name = "Tipo", length = 50)
    private String tipo;

    @ManyToOne
    @JoinColumn(name = "idCarrito", foreignKey = @ForeignKey(name = "FK_metodo_pago_carrito"))
    private Carrito carrito;

    @Column(name = "DetallesPago", length = 255)
    private String detallesPago;
}
