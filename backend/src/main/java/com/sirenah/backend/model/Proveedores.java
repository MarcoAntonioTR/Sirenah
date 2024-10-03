package com.sirenah.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "proveedores")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Proveedores {
    @Id
    private int idProveedores;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "ruc", length = 15)
    private String ruc;

    @Column(name = "correo", length = 100)
    private String correo;

    @Column(name = "telefono", length = 15)
    private String telefono;

    @Column(name = "direccion", length = 255)
    private String direccion;

    private boolean bestado;
}
