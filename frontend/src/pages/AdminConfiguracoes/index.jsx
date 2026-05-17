import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers,
  FaDollarSign, FaClock, FaCog, FaSignOutAlt,
  FaStore, FaWhatsapp, FaInstagram, FaSave, FaBullhorn
} from "react-icons/fa";
import "./AdminConfiguracoes.css";

function AdminConfiguracoes() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin, setNomeAdmin] = useState("Admin");
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const [dadosNegocio, setDadosNegocio] = useState({
    nome: "Lava Mais",
    endereco: "Rua Exemplo, 123 - Sertânia, PE",
    telefone: "(87) 99999-9999",
    email: "contato@lavamais.com",
  });

  const [horarios, setHorarios] = useState([
    { dia: "Segunda-feira",  abre: "07:00", fecha: "18:00", aberto: true  },
    { dia: "Terça-feira",    abre: "07:00", fecha: "18:00", aberto: true  },
    { dia: "Quarta-feira",   abre: "07:00", fecha: "18:00", aberto: true  },
    { dia: "Quinta-feira",   abre: "07:00", fecha: "18:00", aberto: true  },
    { dia: "Sexta-feira",    abre: "07:00", fecha: "18:00", aberto: true  },
    { dia: "Sábado",         abre: "08:00", fecha: "14:00", aberto: true  },
    { dia: "Domingo",        abre: "08:00", fecha: "12:00", aberto: false },
  ]);

  const [precos, setPrecos] = useState({
    lavagem: "15,00",
    secagem: "10,00",
  });

  const [redes, setRedes] = useState({
    whatsapp: "5587992433763",
    instagram: "lavamais_sertania",
  });

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
    { icone: <FaClock />,         label: "Máquinas",     path: "/admin/maquinas"       },
    { icone: <FaBullhorn />,      label: "Novidades",    path: "/admin/novidades"      },
    { icone: <FaCog />,           label: "Configurações",path: "/admin/configuracoes", ativo: true },
  ];

  const salvar = () => {
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      setSalvo(true);
      setTimeout(() => setSalvo(false), 3000);
    }, 1000);
  };

  const atualizarHorario = (index, campo, valor) => {
    const novos = [...horarios];
    novos[index][campo] = valor;
    setHorarios(novos);
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
              <span>Painel de</span>
              <h2>Configurações</h2>
            </section>
          </section>
          <section className="admin-header-right">
            <section className="admin-avatar">{nomeAdmin.charAt(0)}</section>
          </section>
        </header>

        <section className="admin-body">
          <section className="config-grid">

            {/* DADOS DO NEGÓCIO */}
            <section className="admin-panel">
              <div className="admin-panel-header config-panel-header">
                <div className="config-panel-title">
                  <FaStore className="config-icon" />
                  <h4>DADOS DO NEGÓCIO</h4>
                </div>
              </div>
              <div className="config-form">
                <div className="config-field">
                  <label>Nome do estabelecimento</label>
                  <input type="text" value={dadosNegocio.nome} onChange={(e) => setDadosNegocio({ ...dadosNegocio, nome: e.target.value })} />
                </div>
                <div className="config-field">
                  <label>Endereço</label>
                  <input type="text" value={dadosNegocio.endereco} onChange={(e) => setDadosNegocio({ ...dadosNegocio, endereco: e.target.value })} />
                </div>
                <div className="config-row">
                  <div className="config-field">
                    <label>Telefone</label>
                    <input type="text" value={dadosNegocio.telefone} onChange={(e) => setDadosNegocio({ ...dadosNegocio, telefone: e.target.value })} />
                  </div>
                  <div className="config-field">
                    <label>E-mail</label>
                    <input type="email" value={dadosNegocio.email} onChange={(e) => setDadosNegocio({ ...dadosNegocio, email: e.target.value })} />
                  </div>
                </div>
              </div>
            </section>

            {/* PREÇOS */}
            <section className="admin-panel">
              <div className="admin-panel-header config-panel-header">
                <div className="config-panel-title">
                  <FaDollarSign className="config-icon" />
                  <h4>PREÇOS DOS SERVIÇOS</h4>
                </div>
              </div>
              <div className="config-form">
                <div className="config-field">
                  <label>Lavagem (por kg)</label>
                  <div className="config-input-prefix">
                    <span>R$</span>
                    <input type="text" value={precos.lavagem} onChange={(e) => setPrecos({ ...precos, lavagem: e.target.value })} />
                  </div>
                </div>
                <div className="config-field">
                  <label>Secagem (por kg)</label>
                  <div className="config-input-prefix">
                    <span>R$</span>
                    <input type="text" value={precos.secagem} onChange={(e) => setPrecos({ ...precos, secagem: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* REDES SOCIAIS */}
              <div className="admin-panel-header config-panel-header" style={{ marginTop: "24px" }}>
                <div className="config-panel-title">
                  <FaWhatsapp className="config-icon" />
                  <h4>REDES SOCIAIS</h4>
                </div>
              </div>
              <div className="config-form">
                <div className="config-field">
                  <label>WhatsApp (somente números)</label>
                  <div className="config-input-prefix">
                    <FaWhatsapp style={{ color: "#25D366" }} />
                    <input type="text" value={redes.whatsapp} onChange={(e) => setRedes({ ...redes, whatsapp: e.target.value })} />
                  </div>
                </div>
                <div className="config-field">
                  <label>Instagram (usuário)</label>
                  <div className="config-input-prefix">
                    <FaInstagram style={{ color: "#E1306C" }} />
                    <input type="text" value={redes.instagram} onChange={(e) => setRedes({ ...redes, instagram: e.target.value })} />
                  </div>
                </div>
              </div>
            </section>

            {/* HORÁRIOS */}
            <section className="admin-panel config-panel-full">
              <div className="admin-panel-header config-panel-header">
                <div className="config-panel-title">
                  <FaClock className="config-icon" />
                  <h4>HORÁRIO DE FUNCIONAMENTO</h4>
                </div>
              </div>
              <div className="horarios-grid">
                {horarios.map((h, i) => (
                  <div key={i} className={`horario-row ${!h.aberto ? "fechado" : ""}`}>
                    <div className="horario-dia">
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={h.aberto}
                          onChange={(e) => atualizarHorario(i, "aberto", e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span>{h.dia}</span>
                    </div>
                    {h.aberto ? (
                      <div className="horario-inputs">
                        <input type="time" value={h.abre}  onChange={(e) => atualizarHorario(i, "abre",  e.target.value)} />
                        <span>até</span>
                        <input type="time" value={h.fecha} onChange={(e) => atualizarHorario(i, "fecha", e.target.value)} />
                      </div>
                    ) : (
                      <span className="fechado-label">Fechado</span>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </section>

          {/* BOTÃO SALVAR */}
          <div className="config-salvar">
            {salvo && <span className="config-salvo-msg">✓ Configurações salvas com sucesso!</span>}
            <button className="btn-salvar-config" onClick={salvar} disabled={salvando}>
              <FaSave />
              {salvando ? "Salvando..." : "Salvar configurações"}
            </button>
          </div>

        </section>
      </main>
    </section>
  );
}

export default AdminConfiguracoes;