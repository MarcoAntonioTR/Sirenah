package com.sirenah.backend.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.common.PhoneRequest;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferencePayerRequest;
import com.mercadopago.client.preference.PreferencePaymentMethodsRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.resources.preference.PreferenceItem;
import com.sirenah.backend.model.Carrito;
import com.sirenah.backend.model.CarritoDetalle;
import com.sirenah.backend.model.OurUsers;
import com.sirenah.backend.model.Producto;
import com.sirenah.backend.service.CarritoService;
import com.sirenah.backend.service.OurUserService;
import com.sirenah.backend.service.ProductoService;

@RestController
@RequestMapping("/todosroles")

public class PagoController {

    private String mercadoPagoToken = System.getenv("MERCADOPAGO_TOKEN");
    @Autowired
    private ProductoService productoService;
    @Autowired
    private OurUserService ourUserService;
    @Autowired
    private CarritoService carritoService;

    @PostMapping("/mp")
    public String getList(@RequestBody Integer usuarioId){
        Carrito carrito = carritoService.getCarrito(usuarioId);

        try {
            MercadoPagoConfig.setAccessToken(mercadoPagoToken);

            //Creacion de la preferencia
            List<PreferenceItemRequest> items = new ArrayList<>();
            for (CarritoDetalle detalle : carrito.getDetalles()) {
                Optional<Producto> datosProducto = productoService.buscarPorId(detalle.getIdProducto());
                if (datosProducto.isPresent()) {
                    Producto producto = datosProducto.orElseThrow(() -> new RuntimeException("Producto con ID " + detalle.getIdProducto() + " no encontrado"));
                    PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                            .id(String.valueOf(detalle.getIdProducto()))
                            .title(producto.getNombre())
                            .currencyId("PEN")
                            .pictureUrl(producto.getImgUrl())
                            .quantity(detalle.getCantidad())
                            .unitPrice(new BigDecimal(detalle.getPrecioUnitario()))
                            .build();
                    items.add(itemRequest);
                } else {
                    throw new RuntimeException("Producto con ID " + detalle.getIdProducto() + " no encontrado");
                }
            }

            //Preferencia de Control de Sucesos
            PreferenceBackUrlsRequest backUrlsRequest = PreferenceBackUrlsRequest.builder()
                    .success("https://sirenah-production.up.railway.app/PagoExitoso")
                    .failure("https://sirenah-production.up.railway.app/PagoFallido")
                    .pending("https://sirenah-production.up.railway.app/PagoPendiente")
                    .build();
            //Preferencia del Comprador
            Optional<OurUsers> datos =  ourUserService.buscarPorId(usuarioId);
            OurUsers comprador = datos.orElseThrow(() -> new RuntimeException("Usuario con ID " + usuarioId + " no encontrado"));
            PreferencePayerRequest preferencePayerRequest = PreferencePayerRequest.builder()
                    .name(comprador.getNombre())
                    .surname(comprador.getApellido())
                    .email(comprador.getEmail())
                    .phone(
                            PhoneRequest.builder()
                                    .areaCode("51")
                                    .number(comprador.getTelefono())
                                    .build()
                    )
                    .identification(
                            IdentificationRequest.builder()
                                    .type("DNI")
                                    .number(comprador.getDni())
                                    .build()
                    )
                    .build();

            //Metodos de Pago
            PreferencePaymentMethodsRequest paymentMethodsRequest = PreferencePaymentMethodsRequest.builder()
                    .excludedPaymentMethods(new ArrayList<>())
                    .excludedPaymentTypes(new ArrayList<>())
                    .build();

            //Ensable de Preferencias
            OffsetDateTime now = OffsetDateTime.now();
            OffsetDateTime expirationDate = now.plusMinutes(30);

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .payer(preferencePayerRequest)
                    .backUrls(backUrlsRequest)
                    .autoReturn("approved")
                    .paymentMethods(paymentMethodsRequest)
                    .notificationUrl("https://sirenah-nl2m.onrender.com/todosroles/notificacion")
                    .statementDescriptor("Sirenah")
                    .externalReference("Reference_1234")
                    .expires(true)
                    .expirationDateFrom(now)
                    .expirationDateTo(expirationDate)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);
            return preference.getId();
        } catch (MPException | MPApiException e) {
            return e.toString();
        }

    }

    @PostMapping("/notificacion")
    public String recibirNotificacion(@RequestBody String body) {
        String preferenceId = extractPreferenceIdFromBody(body);

        System.out.println(preferenceId);
       try {
            MercadoPagoConfig.setAccessToken("APP_USR-5243950537436063-120112-da4d8ee126cf8679f723ec0d2aea7b5a-2131261284");

            PreferenceClient preferenceClient = new PreferenceClient();
            Preference preference = preferenceClient.get(preferenceId);

            // Variables para generar la boleta
            StringBuilder boleta = new StringBuilder();
            boleta.append("**** BOLETA DE PAGO ****\n");
            boleta.append("Fecha: ").append(LocalDate.now()).append("\n");
            boleta.append("Número de Pedido: ").append(preference.getId()).append("\n");
            boleta.append("Estado del Pago: Pagado");
            // Procesamos los ítems de la preferencia
            BigDecimal total = BigDecimal.ZERO;
            for (PreferenceItem item : preference.getItems()) {
                boleta.append("Producto: ").append(item.getTitle()).append("\n");
                boleta.append("Cantidad: ").append(item.getQuantity()).append("\n");
                boleta.append("Precio Unitario: $").append(item.getUnitPrice()).append("\n");
                boleta.append("-------------------------\n");
                BigDecimal itemTotal = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                total = total.add(itemTotal);
            }

            boleta.append("Total a Pagar: $").append(total).append("\n");
            boleta.append("*********************************\n");

            // Aquí podrías guardar el estado del pedido o realizar otras acciones

            // Si el pago fue exitoso, puedes realizar las acciones necesarias como actualizar el carrito, el estado del pedido, etc.
            return boleta.toString();

        } catch (MPException | MPApiException e) {
            e.printStackTrace();
            return "Error al obtener los detalles de la preferencia";
        }
    }

    // Método auxiliar para extraer el preferenceId del cuerpo del JSON
    private String extractPreferenceIdFromBody(String body) {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
        return jsonObject.get("preference_id").getAsString();
    }

}
