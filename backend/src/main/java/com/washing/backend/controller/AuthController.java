package com.washing.backend.controller;

import com.washing.backend.model.Usuario;
import com.washing.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Permite que o React acesse
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");

        // Busca o usuário no banco pelo e-mail
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Verifica se a senha informada é igual à do banco
            if (usuario.getSenha().equals(senha)) {
                return ResponseEntity.ok(Map.of(
                    "message", "Login realizado com sucesso!",
                    "id", usuario.getId(),
                    "email", usuario.getEmail()
                ));
            }
        }

        // Se o usuário não existir ou a senha estiver errada
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("message", "E-mail ou senha inválidos"));
    }
}