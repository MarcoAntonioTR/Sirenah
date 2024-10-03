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
@Table(name = "pedido")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Pedido {
    @Id
    private int idPedido;

    @ManyToOne
    @JoinColumn(name = "idCliente", foreignKey = @ForeignKey(name = "FK_pedido_cliente"))
    private Cliente cliente;

    @Column(name = "FechaPedido")
    private java.util.Date fechaPedido;

    @Column(name = "Estado", length = 50)
    private String estado;

    @Column(name = "Total", precision = 10, scale = 2)
    private double total;
}
