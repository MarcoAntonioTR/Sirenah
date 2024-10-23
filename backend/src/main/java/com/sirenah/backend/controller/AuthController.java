package com.sirenah.backend.controller;

import com.sirenah.backend.dto.ReqRes;
import com.sirenah.backend.service.impl.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> signup (@RequestBody ReqRes signUpRequest) {
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<ReqRes> signin (@RequestBody ReqRes signInRequest) {
        return ResponseEntity.ok(authService.signIn(signInRequest));
    }
    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken (@RequestBody ReqRes refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }



}
