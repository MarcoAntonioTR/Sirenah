package com.sirenah.backend.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

import io.github.cdimascio.dotenv.Dotenv;

@RestController
@RequestMapping("/public")

public class PagoController {
    Dotenv dotenv = Dotenv.load();
    private String mercadoPagoToken = dotenv.get("MERCADOPAGO_TOKEN");
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
                    .success("https://sirenah.onrender.com/public/success")
                    .failure("https://sirenah.onrender.com/public/failure")
                    .pending("https://sirenah.onrender.com/public/pending")
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
                    .notificationUrl("https://sirenah.onrender.com/public/webhook")
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
    @PostMapping("/success")
    public void handleSuccess(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Imprime todos los parámetros recibidos en la solicitud
        request.getParameterMap().forEach((key, value) -> {
            System.out.println("Parámetro: " + key + " = " + String.join(", ", value));
        });

        // También puedes inspeccionar el cuerpo de la solicitud si es necesario
        System.out.println("Cuerpo completo de la solicitud: " + request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual));

        // Redirigir al front-end con información adicional (opcional)
        response.sendRedirect("https://sirenah-production.up.railway.app/PagoExitoso");
    }



    @PostMapping("/failure")
    public void handleFailure(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Procesar datos y redirigir al front-end para mostrar fallo
        response.sendRedirect("https://sirenah-production.up.railway.app/PagoFallido");
    }

    @PostMapping("/pending")
    public void handlePending(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Procesar datos y redirigir al front-end para estado pendiente
        response.sendRedirect("https://sirenah-production.up.railway.app/PagoPendiente");
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> recibirNotificacion(@RequestBody String body) {
        try {
            // Registrar la recepción del webhook
            System.out.println("Webhook recibido: " + body);

            // Parsear el cuerpo del webhook si es necesario
            // Por ejemplo, puedes usar Gson para convertir el JSON en un objeto:
            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(body, JsonObject.class);

            // Extraer datos del webhook según lo que envía Mercado Pago
            String action = jsonObject.has("action") ? jsonObject.get("action").getAsString() : null;
            String dataId = jsonObject.has("data") ? jsonObject.get("data").getAsJsonObject().get("id").getAsString() : null;

            // Log para depuración
            System.out.println("Acción: " + action);
            System.out.println("ID del recurso: " + dataId);

            // Realiza acciones con los datos recibidos, por ejemplo:
            // - Consultar el recurso en la API de Mercado Pago usando el ID recibido
            // - Actualizar el estado de un pedido en tu base de datos

            // Responder a Mercado Pago que el webhook fue recibido correctamente
            return ResponseEntity.ok("Webhook recibido correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            // Enviar una respuesta de error en caso de fallo
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el webhook");
        }
    }


}
