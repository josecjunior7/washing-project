import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers,
  FaDollarSign, FaClock, FaCog, FaSignOutAlt, FaBullhorn
} from "react-icons/fa";
import "./Admin.css";

const mapStatus = (status) => {
  switch (status) {
    case "CONCLUIDO":    return "ok";
    case "EM_ANDAMENTO": return "andando";
    case "AGUARDANDO":   return "pending";
    case "CANCELADO":    return "cancel";
    default:             return "pending";
  }
};

const STATUS_LABEL = {
  ok:      "Concluído",
  andando: "Em andamento",
  pending: "Aguardando",
  cancel:  "Cancelado",
};

function Admin() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin,     setNomeAdmin]     = useState("Admin");
  const [ultimos,       setUltimos]       = useState([]);
  const [totalHoje,     setTotalHoje]     = useState(0);
  const [receitaMes,    setReceitaMes]    = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeAdmin(user.nome);

    axios.get('http://localhost:8080/api/agendamentos')
      .then(res => {
        const todos = res.data;

        // últimos 5
        const formatados = todos.slice(-5).reverse().map(ag => ({
          cliente: ag.nomeCliente,
          servico: ag.servico,
          horario: ag.horario,
          status:  mapStatus(ag.status),
        }));
        setUltimos(formatados);

        // total hoje
        const hoje = new Date().toISOString().split('T')[0];
        const agHoje = todos.filter(ag => ag.data === hoje || ag.data?.startsWith(hoje));
        setTotalHoje(agHoje.length);

        // receita do mês
        const mesAtual = new Date().getMonth();
        const anoAtual = new Date().getFullYear();
        const receita = todos
          .filter(ag => {
            const d = new Date(ag.data);
            return d.getMonth() === mesAtual && d.getFullYear() === anoAtual
                   && ag.status === "CONCLUIDO";
          })
          .reduce((acc, ag) => acc + (ag.valor || 0), 0);
        setReceitaMes(receita);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { icone: <FaTachometerAlt />, label: "Dashboard",     path: "/admin",              ativo: true },
    { icone: <FaCalendarAlt />,   label: "Agendamentos",  path: "/agendamento-admin"               },
    { icone: <FaUsers />,         label: "Clientes",      path: "/admin/clientes"                  },
    { icone: <FaDollarSign />,    label: "Financeiro",    path: "#"                                },
    { icone: <FaClock />,         label: "Máquinas",      path: "/admin/maquinas"                  },
    { icone: <FaBullhorn />,      label: "Novidades",     path: "/admin/novidades"                 },
    { icone: <FaCog />,           label: "Configurações", path: "/admin/configuracoes"             },
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
              <span>Bem-vindo,</span>
              <h2>{nomeAdmin}</h2>
            </section>
          </section>
          <section className="admin-header-right">
            <section className="admin-avatar">{nomeAdmin.charAt(0)}</section>
          </section>
        </header>

        <section className="admin-body">
          <section className="admin-section">
            <h4>VISÃO GERAL</h4>

            {/* MÉTRICAS */}
            <section className="admin-metrics-grid">
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaCalendarAlt /></div>
                <section className="admin-metric-info">
                  <h5>{totalHoje}</h5>
                  <p>Agendamentos hoje</p>
                </section>
              </section>

              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaDollarSign /></div>
                <section className="admin-metric-info">
                  <h5>R$ {receitaMes.toFixed(2).replace('.', ',')}</h5>
                  <p>Receita do mês</p>
                </section>
              </section>

              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaUsers /></div>
                <section className="admin-metric-info">
                  <h5>—</h5>
                  <p>Clientes ativos</p>
                </section>
              </section>

              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaClock /></div>
                <section className="admin-metric-info">
                  <h5>4/4</h5>
                  <p>Máquinas em uso</p>
                </section>
              </section>
            </section>

            {/* GRID INFERIOR */}
            <section className="admin-bottom-grid">

              {/* ÚLTIMOS AGENDAMENTOS */}
              <section className="admin-panel">
                <div className="admin-panel-header">
                  <h4>ÚLTIMOS AGENDAMENTOS</h4>
                  <button
                    className="admin-panel-link"
                    onClick={() => navigate('/agendamento-admin')}
                  >
                    Ver todos →
                  </button>
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
                    {ultimos.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', color: '#bbb', padding: '20px' }}>
                          Nenhum agendamento ainda.
                        </td>
                      </tr>
                    ) : ultimos.map((ag, i) => (
                      <tr key={i}>
                        <td>{ag.cliente}</td>
                        <td>{ag.servico}</td>
                        <td>{ag.horario}</td>
                        <td>
                          <span className={`status-pill ${ag.status}`}>
                            {STATUS_LABEL[ag.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
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
                    { nome: "Lavadora 1 — lavagem", prog: 70, tempo: "18 min", cor: "purple" },
                    { nome: "Lavadora 2 — lavagem", prog: 45, tempo: "32 min", cor: "purple" },
                    { nome: "Secadora 1 — secagem", prog: 90, tempo: "5 min",  cor: "cyan"   },
                    { nome: "Secadora 2 — secagem", prog: 0,  tempo: "livre",  cor: "free"   },
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