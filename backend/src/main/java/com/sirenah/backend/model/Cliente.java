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
@Table(name = "cliente")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Cliente {
    @Id
    private int idCliente;

    @Column(name = "Nombre", length = 50)
    private String nombre;

    @Column(name = "Apellido", length = 50)
    private String apellido;

    @Column(name = "Correo", length = 100)
    private String correo;

    @Column(name = "Telefono", length = 9)
    private String telefono;

    @ManyToOne
    @JoinColumn(name = "idDireccion", foreignKey = @ForeignKey(name = "FK_cliente_direccion"))
    private Direccion direccion;

    @Column(name = "dni", length = 8)
    private String dni;

    @Column(name = "usuario", length = 50)
    private String usuario;

    @Column(name = "contrasena", length = 255)
    private String contrasena;
}
