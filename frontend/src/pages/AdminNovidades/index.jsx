import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers,
  FaDollarSign, FaClock, FaCog, FaSignOutAlt, FaPlus,
  FaEdit, FaTrash, FaBullhorn
} from "react-icons/fa";
import "./AdminNovidades.css";

function AdminNovidades() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin, setNomeAdmin] = useState("Admin");
  const [modalAberto, setModalAberto] = useState(false);
  const [novidadeEditando, setNovidadeEditando] = useState(null);
  const [novidades, setNovidades] = useState(() => {
    return JSON.parse(localStorage.getItem('novidades')) || [];
  });

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    tipo: "promocao",
    destaque: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeAdmin(user.nome);
  }, []);

  useEffect(() => {
    localStorage.setItem('novidades', JSON.stringify(novidades));
  }, [novidades]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { icone: <FaTachometerAlt />, label: "Dashboard",    path: "/admin"                },
    { icone: <FaCalendarAlt />,  label: "Agendamentos",  path: "#"                     },
    { icone: <FaUsers />,        label: "Clientes",      path: "#"                     },
    { icone: <FaDollarSign />,   label: "Financeiro",    path: "#"                     },
    { icone: <FaClock />,        label: "Máquinas",      path: "/admin/maquinas"       },
    { icone: <FaBullhorn />,     label: "Novidades",     path: "/admin/novidades", ativo: true },
    { icone: <FaCog />,          label: "Configurações", path: "/admin/configuracoes"  },
  ];

  const abrirModal = (novidade = null) => {
    if (novidade) {
      setNovidadeEditando(novidade);
      setForm({
        titulo: novidade.titulo,
        descricao: novidade.descricao,
        tipo: novidade.tipo,
        destaque: novidade.destaque,
      });
    } else {
      setNovidadeEditando(null);
      setForm({ titulo: "", descricao: "", tipo: "promocao", destaque: false });
    }
    setModalAberto(true);
  };

  const salvar = () => {
    if (!form.titulo || !form.descricao) return;
    const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    if (novidadeEditando) {
      setNovidades(novidades.map(n => n.id === novidadeEditando.id ? { ...n, ...form } : n));
    } else {
      const nova = { id: Date.now(), ...form, data };
      setNovidades([nova, ...novidades]);
    }
    setModalAberto(false);
  };

  const excluir = (id) => {
    setNovidades(novidades.filter(n => n.id !== id));
  };

  const getTipoLabel = (tipo) => {
    if (tipo === "promocao") return "Promoção";
    if (tipo === "aviso")    return "Aviso";
    return "Novidade";
  };

  const getTipoClass = (tipo) => {
    if (tipo === "promocao") return "status-pill pending";
    if (tipo === "aviso")    return "status-pill cancel";
    return "status-pill ok";
  };

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
              onClick={() => { navigate(item.path); setSidebarAberta(false); }}
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
              <h2>Novidades</h2>
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
                <div className="admin-icon-box"><FaBullhorn /></div>
                <section className="admin-metric-info">
                  <h5>{novidades.length}</h5>
                  <p>Total de novidades</p>
                </section>
              </section>
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaBullhorn /></div>
                <section className="admin-metric-info">
                  <h5>{novidades.filter(n => n.tipo === "promocao").length}</h5>
                  <p>Promoções ativas</p>
                </section>
              </section>
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaBullhorn /></div>
                <section className="admin-metric-info">
                  <h5>{novidades.filter(n => n.tipo === "aviso").length}</h5>
                  <p>Avisos</p>
                </section>
              </section>
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaBullhorn /></div>
                <section className="admin-metric-info">
                  <h5>{novidades.filter(n => n.destaque).length}</h5>
                  <p>Em destaque</p>
                </section>
              </section>
            </section>

            {/* TABELA */}
            <section className="admin-panel">
              <div className="admin-panel-header maquinas-header">
                <h4>LISTA DE NOVIDADES</h4>
                <button className="btn-nova-maquina" onClick={() => abrirModal()}>
                  <FaPlus /> Nova novidade
                </button>
              </div>

              {novidades.length === 0 ? (
                <section className="novidades-vazio">
                  <FaBullhorn />
                  <p>Nenhuma novidade cadastrada ainda.</p>
                  <span>Clique em "Nova novidade" para começar.</span>
                </section>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Tipo</th>
                      <th>Destaque</th>
                      <th>Data</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {novidades.map((n) => (
                      <tr key={n.id}>
                        <td>{n.titulo}</td>
                        <td><span className={getTipoClass(n.tipo)}>{getTipoLabel(n.tipo)}</span></td>
                        <td>{n.destaque ? "✓ Sim" : "—"}</td>
                        <td>{n.data}</td>
                        <td>
                          <section className="acoes">
                            <button className="btn-acao editar" onClick={() => abrirModal(n)}><FaEdit /></button>
                            <button className="btn-acao excluir" onClick={() => excluir(n.id)}><FaTrash /></button>
                          </section>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

          </section>
        </section>
      </main>

      {/* MODAL */}
      {modalAberto && (
        <div className="maquina-modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="maquina-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{novidadeEditando ? "Editar Novidade" : "Nova Novidade"}</h3>

            <label>Título</label>
            <input
              type="text"
              placeholder="Ex: Promoção de lavagem"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />

            <label>Descrição</label>
            <textarea
              placeholder="Descreva a novidade..."
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              rows={4}
            />

            <label>Tipo</label>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option value="promocao">Promoção</option>
              <option value="servico">Novidade de serviço</option>
              <option value="aviso">Aviso</option>
            </select>

            <div className="destaque-check">
              <input
                type="checkbox"
                id="destaque"
                checked={form.destaque}
                onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
              />
              <label htmlFor="destaque" style={{ textTransform: "none", color: "#333", fontSize: "0.9rem" }}>
                Marcar como destaque
              </label>
            </div>

            <div className="modal-acoes">
              <button className="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="btn-salvar" onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default AdminNovidades;