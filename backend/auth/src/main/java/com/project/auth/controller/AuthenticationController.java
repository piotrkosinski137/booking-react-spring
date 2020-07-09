package com.project.auth.controller;

import com.project.auth.domain.Role;
import com.project.auth.jwt.JwtUtils;
import com.project.auth.domain.BaseEntity;
import com.project.auth.usecase.LoadBaseEntity;
import com.project.auth.usecase.SaveBaseEntity;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtils;
    private final LoadBaseEntity loadBaseEntity;
    private final PasswordEncoder passwordEncoder;
    private final SaveBaseEntity saveBaseEntity;

    public AuthenticationController(AuthenticationManager authManager, JwtUtils jwtUtils,
        LoadBaseEntity loadBaseEntity,
        PasswordEncoder passwordEncoder, SaveBaseEntity saveBaseEntity) {
        this.authManager = authManager;
        this.jwtUtils = jwtUtils;
        this.loadBaseEntity = loadBaseEntity;
        this.passwordEncoder = passwordEncoder;
        this.saveBaseEntity = saveBaseEntity;
    }

    @PostMapping("/auth")
    public ResponseEntity<?> login(@RequestBody JwtAuthenticationRequest request) {
        authenticate(request.getEmail(), request.getPassword());

        BaseEntity baseEntity = loadBaseEntity.loadByUsername(request.getEmail());
        String jwt = jwtUtils.generateToken(baseEntity.getUsername());

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/auth/register")
    public String register(@RequestBody JwtRegisterRequest request) {
        return saveBaseEntity.save(new BaseEntity(request.getEmail(), passwordEncoder.encode(request.getPassword()),
            Role.valueOf(request.getType())));
    }

    private void authenticate(String username, String password) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            throw new EntityNotFoundException("Wrong username or password!");
        }
    }
}
