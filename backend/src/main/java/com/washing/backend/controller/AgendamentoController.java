package com.washing.backend.controller;

import com.washing.backend.model.Agendamento;
import com.washing.backend.model.Usuario;
import com.washing.backend.repository.AgendamentoRepository;
import com.washing.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // ADMIN — buscar todos
    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    // USUARIO — buscar os seus agendamentos
    @GetMapping("/usuario/{usuarioId}")
    public List<Agendamento> listarPorUsuario(@PathVariable Long usuarioId) {
        return agendamentoRepository.findByUsuarioId(usuarioId);
    }

    // CRIAR agendamento
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Map<String, Object> body) {
        try {
            Agendamento ag = new Agendamento();
            ag.setNomeCliente((String) body.get("nomeCliente"));
            ag.setServico((String) body.get("servico"));
            ag.setMaquina((String) body.get("maquina"));
            ag.setHorario((String) body.get("horario"));
            ag.setValor(Double.parseDouble(body.get("valor").toString()));
            ag.setStatus("AGUARDANDO");

            String dataStr = (String) body.get("data");
            String[] partes = dataStr.split("/");
            ag.setData(java.time.LocalDate.of(
                Integer.parseInt(partes[2]),
                Integer.parseInt(partes[1]),
                Integer.parseInt(partes[0])
            ));

            Long usuarioId = Long.parseLong(body.get("usuarioId").toString());
            Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
            ag.setUsuario(usuario);

            agendamentoRepository.save(ag);
            return ResponseEntity.ok(ag);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar agendamento: " + e.getMessage());
        }
    }

    // ADMIN — atualizar status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return agendamentoRepository.findById(id).map(ag -> {
            ag.setStatus(body.get("status"));
            agendamentoRepository.save(ag);
            return ResponseEntity.ok(ag);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ADMIN — deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        agendamentoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}