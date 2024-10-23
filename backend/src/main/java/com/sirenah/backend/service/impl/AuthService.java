package com.sirenah.backend.service.impl;

import com.sirenah.backend.dto.ReqRes;
import com.sirenah.backend.model.OurUsers;
import com.sirenah.backend.repository.OurUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

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
            OurUsers ourUsers = new OurUsers();
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole(registrationRequest.getRole());
            OurUsers ourUsersResult = ourUserRepository.save(ourUsers);
            if ( ourUsersResult != null && ourUsersResult.getId()>0) {
                resp.setOurUsers(ourUsersResult);
                resp.setMessage("Usuario Registrado Correctamente");
                resp.setStatuscode(200);
            }
        } catch ( Exception e) {
            resp.setStatuscode(500);
            resp.setError(e.getMessage());
        }
        return  resp;
    }

    public ReqRes signIn (ReqRes signInRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),signInRequest.getPassword()));
            var user = ourUserRepository.findByEmail(signInRequest.getEmail()).orElseThrow();
            System.out.println("Usuario : " +user);
            var jwt = jwtUtils.generateToken(user);
            var refrestToken = jwtUtils.generateRefreashToken(new HashMap<>(),user);
            response.setStatuscode(200);
            response.setToken(jwt);
            response.setRefreshToken(refrestToken);
            response.setEspirationTime("24hrs");
            response.setMessage("Inicio de Session Exitoso");
        } catch (Exception e) {
            response.setStatuscode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken (ReqRes refreshTokenRequest) {
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getToken());
        OurUsers users = ourUserRepository.findByEmail(ourEmail).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), users)) {
            var jwt = jwtUtils.generateToken(users);
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
