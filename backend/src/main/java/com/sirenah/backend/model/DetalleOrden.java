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
@Table(name = "detalle_orden")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DetalleOrden {
    @Id
    private int idDetalleOrden;

    @ManyToOne
    @JoinColumn(name = "idOrden", foreignKey = @ForeignKey(name = "FK_detalle_orden_orden"))
    private Orden orden;

    @ManyToOne
    @JoinColumn(name = "idProducto", foreignKey = @ForeignKey(name = "FK_detalle_orden_producto"))
    private Producto producto;

    @Column(name = "Cantidad")
    private int cantidad;

    @Column(name = "PrecioUnitario", precision = 10, scale = 2)
    private double precioUnitario;
}
