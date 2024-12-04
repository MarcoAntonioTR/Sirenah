package com.sirenah.backend.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sirenah.backend.model.CarritoDetalle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardPaymentDTO {
    @NotNull
    private String token;
    private String issuerId;
    @NotNull
    @JsonProperty("payment_method_id")
    private String paymentMethodId;
    @NotNull
    private BigDecimal transactionAmount;
    @NotNull
    private Integer installments;
    @NotNull
    @JsonProperty("description")
    private List<CarritoDetalle> items;
    @NotNull
    private PayerDTO payer;
}
