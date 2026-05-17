import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers,
  FaDollarSign, FaClock, FaCog, FaSignOutAlt, FaPlus,
  FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaBullhorn
} from "react-icons/fa";
import "./AdminMaquinas.css";

function AdminMaquinas() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin, setNomeAdmin] = useState("Admin");
  const [modalAberto, setModalAberto] = useState(false);
  const [maquinaEditando, setMaquinaEditando] = useState(null);
  const [maquinas, setMaquinas] = useState([
    { id: 1, nome: "Lavadora 1", tipo: "Lavagem", status: "Disponível", tempo: "—", capacidade: "10kg" },
    { id: 2, nome: "Lavadora 2", tipo: "Lavagem", status: "Disponível", tempo: "—", capacidade: "10kg" },
    { id: 3, nome: "Secadora 1", tipo: "Secagem", status: "Disponível", tempo: "—", capacidade: "8kg"  },
    { id: 4, nome: "Secadora 2", tipo: "Secagem", status: "Disponível", tempo: "—", capacidade: "8kg"  },
  ]);

  const [form, setForm] = useState({ nome: "", tipo: "Lavagem", capacidade: "", status: "Disponível" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeAdmin(user.nome);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { icone: <FaTachometerAlt />, label: "Dashboard",    path: "/admin"                },
    { icone: <FaCalendarAlt />,   label: "Agendamentos", path: "/agendamento-admin"    },
    { icone: <FaUsers />,         label: "Clientes",     path: "#"                     },
    { icone: <FaDollarSign />,    label: "Financeiro",   path: "#"                     },
    { icone: <FaClock />,         label: "Máquinas",     path: "/admin/maquinas",      ativo: true },
    { icone: <FaBullhorn />,      label: "Novidades",    path: "/admin/novidades"      },
    { icone: <FaCog />,           label: "Configurações",path: "/admin/configuracoes"  },
  ];

  const abrirModal = (maquina = null) => {
    if (maquina) {
      setMaquinaEditando(maquina);
      setForm({ nome: maquina.nome, tipo: maquina.tipo, capacidade: maquina.capacidade, status: maquina.status });
    } else {
      setMaquinaEditando(null);
      setForm({ nome: "", tipo: "Lavagem", capacidade: "", status: "Disponível" });
    }
    setModalAberto(true);
  };

  const salvarMaquina = () => {
    if (!form.nome || !form.capacidade) return;
    if (maquinaEditando) {
      setMaquinas(maquinas.map(m => m.id === maquinaEditando.id ? { ...m, ...form } : m));
    } else {
      const nova = { id: maquinas.length + 1, ...form, tempo: "—" };
      setMaquinas([...maquinas, nova]);
    }
    setModalAberto(false);
  };

  const excluirMaquina = (id) => {
    setMaquinas(maquinas.filter(m => m.id !== id));
  };

  const getStatusClass = (status) => {
    if (status === "Em uso")     return "status-pill pending";
    if (status === "Disponível") return "status-pill ok";
    if (status === "Manutenção") return "status-pill cancel";
    return "";
  };

  const totalEmUso      = maquinas.filter(m => m.status === "Em uso").length;
  const totalDisponivel = maquinas.filter(m => m.status === "Disponível").length;
  const totalManutencao = maquinas.filter(m => m.status === "Manutenção").length;

  return (
    <section className="admin-layout">

      {sidebarAberta && (
        <div className="admin-overlay" onClick={() => setSidebarAberta(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarAberta ? "aberta" : ""}`}>
        <div className="admin-sidebar-header">
          <h2>Lava Mais</h2>
          <p>Painel Admin</p>
        </div>
        <nav className="admin-sidebar-nav">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`admin-sidebar-item ${item.ativo ? "active" : ""}`}
              onClick={() => { if (item.path !== "#") navigate(item.path); setSidebarAberta(false); }}
            >
              <span className="admin-sidebar-icon">{item.icone}</span>
              <span className="admin-sidebar-label">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-item" onClick={handleLogout}>
            <span className="admin-sidebar-icon"><FaSignOutAlt /></span>
            <span className="admin-sidebar-label">Sair da conta</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <header className="admin-header">
          <section className="admin-header-left">
            <button className="admin-btn-hamburguer" onClick={() => setSidebarAberta(true)}>
              <FaBars />
            </button>
            <section className="admin-welcome">
              <span>Gerenciamento de</span>
              <h2>Máquinas</h2>
            </section>
          </section>
          <section className="admin-header-right">
            <section className="admin-avatar">{nomeAdmin.charAt(0)}</section>
          </section>
        </header>

        <section className="admin-body">
          <section className="admin-section">

            {/* MÉTRICAS */}
            <section className="admin-metrics-grid">
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaClock /></div>
                <section className="admin-metric-info">
                  <h5>{totalEmUso}</h5>
                  <p>Em uso</p>
                </section>
              </section>
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaCheckCircle /></div>
                <section className="admin-metric-info">
                  <h5>{totalDisponivel}</h5>
                  <p>Disponíveis</p>
                </section>
              </section>
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaTimesCircle /></div>
                <section className="admin-metric-info">
                  <h5>{totalManutencao}</h5>
                  <p>Em manutenção</p>
                </section>
              </section>
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaClock /></div>
                <section className="admin-metric-info">
                  <h5>{maquinas.length}</h5>
                  <p>Total de máquinas</p>
                </section>
              </section>
            </section>

            {/* TABELA */}
            <section className="admin-panel">
              <div className="admin-panel-header maquinas-header">
                <h4>LISTA DE MÁQUINAS</h4>
                <button className="btn-nova-maquina" onClick={() => abrirModal()}>
                  <FaPlus /> Nova máquina
                </button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Capacidade</th>
                    <th>Tempo restante</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {maquinas.map((m) => (
                    <tr key={m.id}>
                      <td>{m.nome}</td>
                      <td>{m.tipo}</td>
                      <td>{m.capacidade}</td>
                      <td>{m.tempo}</td>
                      <td><span className={getStatusClass(m.status)}>{m.status}</span></td>
                      <td>
                        <section className="acoes">
                          <button className="btn-acao editar"  onClick={() => abrirModal(m)}><FaEdit /></button>
                          <button className="btn-acao excluir" onClick={() => excluirMaquina(m.id)}><FaTrash /></button>
                        </section>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

          </section>
        </section>
      </main>

      {/* MODAL */}
      {modalAberto && (
        <div className="maquina-modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="maquina-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{maquinaEditando ? "Editar Máquina" : "Nova Máquina"}</h3>

            <label>Nome</label>
            <input
              type="text"
              placeholder="Ex: Máquina 05"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <label>Tipo</label>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option>Lavagem</option>
              <option>Secagem</option>
            </select>

            <label>Capacidade</label>
            <input
              type="text"
              placeholder="Ex: 10kg"
              value={form.capacidade}
              onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
            />

            <label>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Disponível</option>
              <option>Em uso</option>
              <option>Manutenção</option>
            </select>

            <div className="modal-acoes">
              <button className="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="btn-salvar"   onClick={salvarMaquina}>Salvar</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default AdminMaquinas;