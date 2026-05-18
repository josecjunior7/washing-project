import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers,
  FaDollarSign, FaClock, FaCog, FaSignOutAlt, FaBullhorn,
  FaSearch, FaEye, FaBan, FaCheckCircle, FaTimes,
  FaChevronLeft, FaChevronRight, FaPhone,
  FaUserCircle
} from "react-icons/fa";
import "../Admin/Admin.css";
import "./AdminClientes.css";

const POR_PAGINA = 8;

function AdminClientes() {
  const navigate = useNavigate();

  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin,     setNomeAdmin]     = useState("Admin");
  const [busca,         setBusca]         = useState("");
  const [filtroStatus,  setFiltroStatus]  = useState("todos");
  const [pagina,        setPagina]        = useState(1);
  const [modalCliente,  setModalCliente]  = useState(null);
  const [clientes,      setClientes]      = useState([]);
  const [carregando,    setCarregando]    = useState(true);

  const menuItems = [
    { icone: <FaTachometerAlt />, label: "Dashboard",    path: "/admin"               },
    { icone: <FaCalendarAlt />,   label: "Agendamentos", path: "/agendamento-admin"   },
    { icone: <FaUsers />,         label: "Clientes",     path: "/admin/clientes",     ativo: true },
    { icone: <FaDollarSign />,    label: "Financeiro",   path: "#"                    },
    { icone: <FaClock />,         label: "Máquinas",     path: "/admin/maquinas"      },
    { icone: <FaBullhorn />,      label: "Novidades",    path: "/admin/novidades"     },
    { icone: <FaCog />,           label: "Configurações",path: "/admin/configuracoes" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.nome) setNomeAdmin(user.nome);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/usuarios')
      .then(res => res.json())
      .then(data => {
        const formatados = data.map((u, i) => ({
          id:           `#C${String(i + 1).padStart(3, '0')}`,
          nome:         u.nome,
          email:        u.email,
          telefone:     u.telefone,
          agendamentos: 0,
          status:       "ativo",
          cadastro:     new Date(u.criadoEm).toLocaleDateString('pt-BR'),
        }));
        setClientes(formatados);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleBloquear = (id) => {
    setClientes(prev => prev.map(c =>
      c.id === id
        ? { ...c, status: c.status === "ativo" ? "bloqueado" : "ativo" }
        : c
    ));
    if (modalCliente?.id === id) {
      setModalCliente(prev => ({
        ...prev,
        status: prev.status === "ativo" ? "bloqueado" : "ativo"
      }));
    }
  };

  const clientesFiltrados = clientes.filter(c => {
    const buscaOk  = c.nome.toLowerCase().includes(busca.toLowerCase()) ||
                     c.telefone.includes(busca) ||
                     c.id.toLowerCase().includes(busca.toLowerCase());
    const statusOk = filtroStatus === "todos" || c.status === filtroStatus;
    return buscaOk && statusOk;
  });

  const totalPaginas   = Math.ceil(clientesFiltrados.length / POR_PAGINA);
  const clientesPagina = clientesFiltrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);
  const totalAtivos     = clientes.filter(c => c.status === "ativo").length;
  const totalBloqueados = clientes.filter(c => c.status === "bloqueado").length;

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
              <h2>Clientes</h2>
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
                <div className="admin-icon-box"><FaUsers /></div>
                <section className="admin-metric-info">
                  <h5>{clientes.length}</h5>
                  <p>Total de clientes</p>
                </section>
              </section>
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaCheckCircle /></div>
                <section className="admin-metric-info">
                  <h5>{totalAtivos}</h5>
                  <p>Clientes ativos</p>
                </section>
              </section>
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaBan /></div>
                <section className="admin-metric-info">
                  <h5>{totalBloqueados}</h5>
                  <p>Bloqueados</p>
                </section>
              </section>
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaCalendarAlt /></div>
                <section className="admin-metric-info">
                  <h5>{clientes.reduce((acc, c) => acc + c.agendamentos, 0)}</h5>
                  <p>Total agendamentos</p>
                </section>
              </section>
            </section>

            {/* PAINEL */}
            <div className="admin-panel">

              {/* FILTROS */}
              <div className="ac-filtros">
                <div className="ac-busca">
                  <FaSearch className="ac-busca-icone" />
                  <input
                    className="ac-busca-input"
                    placeholder="Buscar por nome, telefone ou ID..."
                    value={busca}
                    onChange={e => { setBusca(e.target.value); setPagina(1); }}
                  />
                </div>
                <div className="ac-filtro-status">
                  {[
                    { valor: "todos",     label: "Todos"      },
                    { valor: "ativo",     label: "Ativos"     },
                    { valor: "bloqueado", label: "Bloqueados" },
                  ].map(f => (
                    <button
                      key={f.valor}
                      className={`ac-filtro-btn ${filtroStatus === f.valor ? "ativo" : ""}`}
                      onClick={() => { setFiltroStatus(f.valor); setPagina(1); }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="ac-resumo">
                {carregando ? "Carregando clientes..." : `${clientesFiltrados.length} cliente${clientesFiltrados.length !== 1 ? "s" : ""} encontrado${clientesFiltrados.length !== 1 ? "s" : ""}`}
              </p>

              {/* TABELA */}
              <div className="ac-tabela-wrapper">
                <table className="admin-table ac-tabela">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Cadastro</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carregando ? (
                      <tr>
                        <td colSpan={7} className="ac-vazio">Carregando...</td>
                      </tr>
                    ) : clientesPagina.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="ac-vazio">Nenhum cliente encontrado.</td>
                      </tr>
                    ) : clientesPagina.map((c, i) => (
                      <tr key={i} className="ac-linha">
                        <td className="ac-id">{c.id}</td>
                        <td className="ac-nome">
                          <div className="ac-avatar">{c.nome.charAt(0)}</div>
                          {c.nome}
                        </td>
                        <td>{c.email}</td>
                        <td>
                          <span className="ac-telefone">
                            <FaPhone style={{ fontSize: "0.7rem" }} />
                            {c.telefone}
                          </span>
                        </td>
                        <td>{c.cadastro}</td>
                        <td>
                          <span className={`status-pill ${c.status === "ativo" ? "ok" : "cancel"}`}>
                            {c.status === "ativo" ? "Ativo" : "Bloqueado"}
                          </span>
                        </td>
                        <td>
                          <div className="ac-acoes">
                            <button className="ac-btn-acao ver" title="Ver detalhes" onClick={() => setModalCliente(c)}>
                              <FaEye />
                            </button>
                            <button
                              className={`ac-btn-acao ${c.status === "ativo" ? "bloquear" : "desbloquear"}`}
                              title={c.status === "ativo" ? "Bloquear" : "Desbloquear"}
                              onClick={() => toggleBloquear(c.id)}
                            >
                              {c.status === "ativo" ? <FaBan /> : <FaCheckCircle />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINAÇÃO */}
              {totalPaginas > 1 && (
                <div className="ac-paginacao">
                  <button className="ac-pag-btn" disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>
                    <FaChevronLeft />
                  </button>
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
                    <button key={p} className={`ac-pag-btn ${pagina === p ? "ativo" : ""}`} onClick={() => setPagina(p)}>
                      {p}
                    </button>
                  ))}
                  <button className="ac-pag-btn" disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)}>
                    <FaChevronRight />
                  </button>
                  <span className="ac-pag-info">Página {pagina} de {totalPaginas}</span>
                </div>
              )}
            </div>

          </section>
        </section>
      </main>

      {/* MODAL */}
      {modalCliente && (
        <div className="ac-modal-overlay" onClick={() => setModalCliente(null)}>
          <div className="ac-modal" onClick={e => e.stopPropagation()}>
            <div className="ac-modal-header">
              <h3>Detalhes do Cliente</h3>
              <button className="ac-modal-close" onClick={() => setModalCliente(null)}>
                <FaTimes />
              </button>
            </div>
            <div className="ac-modal-body">
              <div className="ac-modal-avatar">
                <FaUserCircle />
                <div>
                  <h4>{modalCliente.nome}</h4>
                  <span className={`status-pill ${modalCliente.status === "ativo" ? "ok" : "cancel"}`}>
                    {modalCliente.status === "ativo" ? "Ativo" : "Bloqueado"}
                  </span>
                </div>
              </div>
              {[
                ["ID",          modalCliente.id],
                ["Email",       modalCliente.email],
                ["Telefone",    modalCliente.telefone],
                ["Cadastro em", modalCliente.cadastro],
              ].map(([label, value]) => (
                <div className="ac-modal-row" key={label}>
                  <span className="ac-modal-label">{label}</span>
                  <span className="ac-modal-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="ac-modal-footer">
              <button
                className={`ac-modal-btn ${modalCliente.status === "ativo" ? "bloquear" : "desbloquear"}`}
                onClick={() => toggleBloquear(modalCliente.id)}
              >
                {modalCliente.status === "ativo"
                  ? <><FaBan /> Bloquear cliente</>
                  : <><FaCheckCircle /> Desbloquear cliente</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default AdminClientes;