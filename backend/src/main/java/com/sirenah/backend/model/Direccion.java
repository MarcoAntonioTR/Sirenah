package com.sirenah.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "direccion")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Direccion {
    @Id
    private int idDireccion;

    @Column(name = "Departamento", length = 50)
    private String departamento;

    @Column(name = "Provincia", length = 50)
    private String provincia;

    @Column(name = "Distrito", length = 50)
    private String distrito;
}
