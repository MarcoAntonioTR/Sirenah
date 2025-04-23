package com.sirenah.backend.model;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDireccion;
    @Column(name = "descripcion", length = 100)
    private String Descripcion;
    @Column(name = "departamento", length = 50)
    private String Departamento;
    @Column(name = "provincia", length = 50)
    private String Provincia;
    @Column(name = "distrito", length = 50)
    private String Distrito;

    @ManyToOne
    @JoinColumn(name = "idOurUsers", nullable = false)
    private OurUsers ourUsers;
}
