package com.sirenah.backend.service.impl;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sirenah.backend.dto.ReqRes;
import com.sirenah.backend.model.OurUsers;
import com.sirenah.backend.repository.OurUserRepository;

@Service
public class AuthService {

    @Autowired
    private OurUserRepository ourUserRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public ReqRes signUp(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {

            Optional<OurUsers> existingUser = ourUserRepository.findByEmail(registrationRequest.getEmail());

            if (existingUser.isPresent()) {
                resp.setStatuscode(409);
                resp.setMessage("El correo electrónico ya está en uso");
                return resp;
            }

            Optional<OurUsers> existingDniUser = ourUserRepository.findByDni(registrationRequest.getOurUsers().getDni());
            if (existingDniUser.isPresent()) {
                resp.setStatuscode(410);
                resp.setMessage("Ya existe un usuario con el mismo DNI.");
                return resp;
            }
            OurUsers ourUsers = new OurUsers();
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole(registrationRequest.getRole());
            ourUsers.setNombre(registrationRequest.getName());
            ourUsers.setApellido(registrationRequest.getOurUsers().getApellido());
            ourUsers.setDni(registrationRequest.getOurUsers().getDni());
            ourUsers.setTelefono(registrationRequest.getOurUsers().getTelefono());
            ourUsers.setFecha_nacimiento(registrationRequest.getOurUsers().getFecha_nacimiento());

            OurUsers ourUsersResult = ourUserRepository.save(ourUsers);

            if ( ourUsersResult != null && ourUsersResult.getId()>0) {
                resp.setOurUsers(ourUsersResult);
                resp.setMessage("Usuario Registrado Correctamente");
                resp.setStatuscode(200);
            }
        }catch ( Exception e) {
            resp.setStatuscode(500);
            resp.setError(e.getMessage());
        }
        return  resp;
    }

    public ReqRes signIn(ReqRes signInRequest) {
        ReqRes response = new ReqRes();
        try {
            // Verificar si el usuario existe antes de autenticar
            var user = ourUserRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el email: " + signInRequest.getEmail()));

            // Si el usuario existe, proceder con la autenticación
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
            );
    
            // Generar tokens JWT
            var jwt = jwtUtils.generateToken(user, user.getRole());
            var refreshToken = jwtUtils.generateRefreashToken(new HashMap<>(), user);

            // Respuesta exitosa
            response.setStatuscode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setEspirationTime("24hrs");
            response.setMessage("Inicio de sesión exitoso");

        } catch (BadCredentialsException e) {
            // Manejo de error de credenciales incorrectas
            response.setStatuscode(401);
            response.setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.");
        } catch (UsernameNotFoundException e) {
            // Manejo de error de usuario no encontrado
            response.setStatuscode(404);
            response.setError("Usuario no existe. Verifica tu correo electrónico o regístrate.");
        } catch (Exception e) {
            // Manejo de otros errores genéricos
            response.setStatuscode(500);
            response.setError("Error del servidor: " + e.getMessage());
        }
        return response;
    }
    


    public ReqRes refreshToken (ReqRes refreshTokenRequest) {
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getToken());
        OurUsers users = ourUserRepository.findByEmail(ourEmail).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), users)) {
            var jwt = jwtUtils.generateToken(users, users.getRole());
            response.setStatuscode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            response.setEspirationTime("24hrs");
            response.setMessage("Token Actualizado Exitosamente  ");
        }
        response.setStatuscode(500);
        return response;
    }

}
