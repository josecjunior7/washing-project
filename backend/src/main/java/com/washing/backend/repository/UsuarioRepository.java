package com.washing.backend.repository;

import com.washing.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Isso aqui permite que o Spring busque o usuário pelo e-mail automaticamente
    Optional<Usuario> findByEmail(String email);
}