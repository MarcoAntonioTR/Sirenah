package com.sirenah.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categoria")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Categoria {
    @Id
    private int idCategoria;

    @Column(name = "Nombre", length = 50)
    private String nombre;
}
