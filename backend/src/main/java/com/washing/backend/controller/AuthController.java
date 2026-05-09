package com.washing.backend.controller;

import com.washing.backend.model.Usuario;
import com.washing.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Email que será reconhecido como ADMIN automaticamente
    private static final String EMAIL_ADMIN = "admin@lavamais.com";

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Map<String, String> dados) {

        String nome     = dados.get("nome");
        String email    = dados.get("email");
        String telefone = dados.get("telefone");
        String senha    = dados.get("senha");

        if (nome == null || nome.isBlank())
            return ResponseEntity.badRequest().body(Map.of("message", "Nome obrigatorio"));

        if (email == null || email.isBlank())
            return ResponseEntity.badRequest().body(Map.of("message", "E-mail obrigatorio"));

        if (telefone == null || telefone.isBlank())
            return ResponseEntity.badRequest().body(Map.of("message", "Telefone obrigatorio"));

        if (senha == null || senha.length() < 6)
            return ResponseEntity.badRequest().body(Map.of("message", "Senha deve ter pelo menos 6 caracteres"));

        if (usuarioRepository.existsByEmail(email.toLowerCase().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "E-mail ja cadastrado"));
        }

        Usuario usuario = new Usuario();
        usuario.setNome(nome.trim());
        usuario.setEmail(email.toLowerCase().trim());
        usuario.setTelefone(telefone.trim());
        usuario.setSenha(passwordEncoder.encode(senha));

        // Define role baseado no email
        if (email.toLowerCase().trim().equals(EMAIL_ADMIN)) {
            usuario.setRole("ADMIN");
        } else {
            usuario.setRole("CLIENTE");
        }

        Usuario salvo = usuarioRepository.save(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
            "message", "Cadastro realizado com sucesso!",
            "id",      salvo.getId(),
            "nome",    salvo.getNome(),
            "email",   salvo.getEmail(),
            "role",    salvo.getRole()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String senha = loginData.get("senha");

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(
            email.toLowerCase().trim()
        );

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            if (passwordEncoder.matches(senha, usuario.getSenha())) {
                return ResponseEntity.ok(Map.of(
                    "message", "Login realizado com sucesso!",
                    "id",      usuario.getId(),
                    "nome",    usuario.getNome(),
                    "email",   usuario.getEmail(),
                    "role",    usuario.getRole()
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "E-mail ou senha invalidos"));
    }
}