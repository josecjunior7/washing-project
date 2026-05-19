package com.washing.backend.controller;

import com.washing.backend.model.Agendamento;
import com.washing.backend.model.Usuario;
import com.washing.backend.repository.AgendamentoRepository;
import com.washing.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public List<Map<String, Object>> listarTodos() {
        return agendamentoRepository.findAll()
            .stream()
            .map(this::toMap)
            .collect(Collectors.toList());
    }

    // USUARIO — buscar os seus agendamentos
    @GetMapping("/usuario/{usuarioId}")
    public List<Map<String, Object>> listarPorUsuario(@PathVariable Long usuarioId) {
        return agendamentoRepository.findByUsuarioId(usuarioId)
            .stream()
            .map(this::toMap)
            .collect(Collectors.toList());
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
            return ResponseEntity.ok(toMap(ag));
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
            return ResponseEntity.ok(toMap(ag));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ADMIN — deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        agendamentoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Converte Agendamento para Map (evita erro de serialização do relacionamento)
    private Map<String, Object> toMap(Agendamento ag) {
        Map<String, Object> map = new HashMap<>();
        map.put("id",          ag.getId());
        map.put("nomeCliente", ag.getNomeCliente());
        map.put("servico",     ag.getServico());
        map.put("maquina",     ag.getMaquina() != null ? ag.getMaquina() : "");
        map.put("horario",     ag.getHorario() != null ? ag.getHorario() : "");
        map.put("valor",       ag.getValor() != null ? ag.getValor() : 0.0);
        map.put("status",      ag.getStatus());
        map.put("data",        ag.getData() != null
                                   ? ag.getData().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                                   : "");
        map.put("usuarioId",   ag.getUsuario() != null ? ag.getUsuario().getId() : null);
        return map;
    }
}