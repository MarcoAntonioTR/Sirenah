package com.sirenah.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductoDTO {
    private String nombre;
    private String descripcion;
    private double precio;
    private int stockMinimo;
    private int stock;
    private int idCategoria;
    private boolean estado;
}
