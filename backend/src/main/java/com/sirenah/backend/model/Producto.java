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
@Table(name = "producto")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Producto {
    @Id
    private int idProducto;

    @Column(name = "Nombre", length = 50)
    private String nombre;

    @Column(name = "Descripcion", length = 150)
    private String descripcion;

    @Column(name = "Precio", precision = 10, scale = 2)
    private double precio;

    @Column(name = "stockminimo")
    private int stockMinimo;

    @Column(name = "Stock")
    private int stock;

    @ManyToOne
    @JoinColumn(name = "idCategoria", foreignKey = @ForeignKey(name = "FK_producto_categoria"))
    private Categoria categoria;

    private boolean bestado;
}
