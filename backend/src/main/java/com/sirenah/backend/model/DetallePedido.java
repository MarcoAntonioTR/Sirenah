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
@Table(name = "detalle_pedido")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DetallePedido {
    @Id
    private int idDetallePedido;

    @ManyToOne
    @JoinColumn(name = "idPedido", foreignKey = @ForeignKey(name = "FK_detalle_pedido_pedido"))
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "idProducto", foreignKey = @ForeignKey(name = "FK_detalle_pedido_producto"))
    private Producto producto;

    @Column(name = "Cantidad")
    private int cantidad;

    @Column(name = "PrecioUnitario", precision = 10, scale = 2)
    private double precioUnitario;
}
