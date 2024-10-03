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
@Table(name = "orden")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Orden {
    @Id
    private int idOrden;

    @ManyToOne
    @JoinColumn(name = "idProveedor", foreignKey = @ForeignKey(name = "FK_orden_proveedor"))
    private Proveedores proveedor;

    @Column(name = "FechaOrden")
    private java.util.Date fechaOrden;

    @Column(name = "Estado", length = 50)
    private String estado;

    @Column(name = "Total", precision = 10, scale = 2)
    private double total;
}
