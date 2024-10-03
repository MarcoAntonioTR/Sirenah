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
@Table(name = "carrito")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Carrito {
    @Id
    private int idCarrito;

    @Column(name = "cantCarrito")
    private int cantCarrito;

    @ManyToOne
    @JoinColumn(name = "idCliente", foreignKey = @ForeignKey(name = "FK_carrito_cliente"))
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "idProducto", foreignKey = @ForeignKey(name = "FK_carrito_producto"))
    private Producto producto;
}
