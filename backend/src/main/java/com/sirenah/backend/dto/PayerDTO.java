package com.sirenah.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayerDTO {
    @NotNull
    private String email;
    @NotNull
    private PayerIdentificationDTO identification;
}
