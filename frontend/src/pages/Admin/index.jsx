import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers,
  FaDollarSign, FaClock, FaCog, FaSignOutAlt
} from "react-icons/fa";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin, setNomeAdmin] = useState("Admin");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeAdmin(user.nome);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { icone: <FaTachometerAlt />, label: "Dashboard",    path: "/admin",          ativo: true },
    { icone: <FaCalendarAlt />,  label: "Agendamentos",  path: "#"                            },
    { icone: <FaUsers />,        label: "Clientes",      path: "#"                            },
    { icone: <FaDollarSign />,   label: "Financeiro",    path: "#"                            },
    { icone: <FaClock />,        label: "Máquinas",      path: "/admin/maquinas"              },
    { icone: <FaCog />,          label: "Configurações", path: "#"                            },
  ];

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
              onClick={() => { if (item.path) navigate(item.path); setSidebarAberta(false); }}
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="admin-main">

        {/* HEADER */}
        <header className="admin-header">
          <section className="admin-header-left">
            <button className="admin-btn-hamburguer" onClick={() => setSidebarAberta(true)}>
              <FaBars />
            </button>
            <section className="admin-welcome">
              <span>Bem-vindo,</span>
              <h2>{nomeAdmin}</h2>
            </section>
          </section>
          <section className="admin-header-right">
            <section className="admin-avatar">
              {nomeAdmin.charAt(0)}
            </section>
          </section>
        </header>

        {/* BODY */}
        <section className="admin-body">
          <section className="admin-section">
            <h4>VISÃO GERAL</h4>

            {/* CARDS DE MÉTRICAS */}
            <section className="admin-metrics-grid">
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaCalendarAlt /></div>
                <section className="admin-metric-info">
                  <h5>24</h5>
                  <p>Agendamentos hoje</p>
                  <span className="trend up">↑ 12% vs ontem</span>
                </section>
              </section>

              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaDollarSign /></div>
                <section className="admin-metric-info">
                  <h5>R$ 4.820</h5>
                  <p>Receita do mês</p>
                  <span className="trend up">↑ 8% vs mês ant.</span>
                </section>
              </section>

              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaUsers /></div>
                <section className="admin-metric-info">
                  <h5>187</h5>
                  <p>Clientes ativos</p>
                  <span className="trend up">↑ 5 novos hoje</span>
                </section>
              </section>

              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaClock /></div>
                <section className="admin-metric-info">
                  <h5>6/8</h5>
                  <p>Máquinas em uso</p>
                  <span className="trend down">2 disponíveis</span>
                </section>
              </section>
            </section>

            {/* GRID INFERIOR */}
            <section className="admin-bottom-grid">

              {/* TABELA DE AGENDAMENTOS */}
              <section className="admin-panel">
                <div className="admin-panel-header">
                  <h4>ÚLTIMOS AGENDAMENTOS</h4>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Serviço</th>
                      <th>Horário</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Filipe M.</td><td>Lavagem</td><td>08:00</td><td><span className="status-pill ok">Concluído</span></td></tr>
                    <tr><td>Ana Lima</td><td>Secagem</td><td>09:30</td><td><span className="status-pill ok">Concluído</span></td></tr>
                    <tr><td>Carlos R.</td><td>Lavagem</td><td>11:00</td><td><span className="status-pill pending">Em andamento</span></td></tr>
                    <tr><td>Juliana S.</td><td>Lavagem</td><td>13:00</td><td><span className="status-pill pending">Aguardando</span></td></tr>
                    <tr><td>Pedro A.</td><td>Secagem</td><td>14:30</td><td><span className="status-pill cancel">Cancelado</span></td></tr>
                  </tbody>
                </table>
              </section>

              {/* STATUS DAS MÁQUINAS */}
              <section className="admin-panel">
                <div className="admin-panel-header">
                  <h4>STATUS DAS MÁQUINAS</h4>
                </div>
                <section className="admin-maquinas">
                  {[
                    { nome: "Máquina 01 — lavagem",    prog: 70, tempo: "18 min", cor: "purple" },
                    { nome: "Máquina 02 — lavagem",    prog: 45, tempo: "32 min", cor: "purple" },
                    { nome: "Máquina 03 — secagem",    prog: 90, tempo: "5 min",  cor: "cyan"   },
                    { nome: "Máquina 04 — secagem",    prog: 0,  tempo: "livre",  cor: "free"   },
                  ].map((m, i) => (
                    <section key={i} className="admin-maquina-row">
                      <div className={`admin-maquina-icon ${m.cor}`}>
                        <FaClock />
                      </div>
                      <section className="admin-maquina-info">
                        <span>{m.nome}</span>
                        <div className="admin-maquina-bar">
                          <div className={`admin-maquina-fill ${m.cor}`} style={{ width: `${m.prog}%` }} />
                        </div>
                      </section>
                      <span className={`admin-maquina-tempo ${m.cor}`}>{m.tempo}</span>
                    </section>
                  ))}
                </section>
              </section>

            </section>
          </section>
        </section>
      </main>
    </section>
  );
}

export default Admin;