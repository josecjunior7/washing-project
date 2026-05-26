import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api";
import { toast } from 'react-toastify';
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers, FaDollarSign,
  FaClock, FaCog, FaSignOutAlt, FaSearch, FaFilter, FaEye, FaEdit,
  FaTimes, FaChevronLeft, FaChevronRight, FaCheckCircle, FaSpinner,
  FaHourglassHalf, FaBan, FaBullhorn, FaSync
} from "react-icons/fa";

import "../Admin/Admin.css";
import "./AgendamentoAdmin.css";

const POR_PAGINA = 5;

const STATUS_LABEL = {
  ok:      { label: "Concluído",    icone: <FaCheckCircle />   },
  andando: { label: "Em andamento", icone: <FaSpinner />       },
  pending: { label: "Aguardando",   icone: <FaHourglassHalf /> },
  cancel:  { label: "Cancelado",    icone: <FaBan />           },
};

const mapStatus = (status) => {
  switch (status) {
    case "CONCLUIDO":     return "ok";
    case "EM_ANDAMENTO":  return "andando";
    case "AGUARDANDO":    return "pending";
    case "CANCELADO":     return "cancel";
    default:              return "pending";
  }
};

const mapStatusBack = (status) => {
  switch (status) {
    case "ok":      return "CONCLUIDO";
    case "andando": return "EM_ANDAMENTO";
    case "pending": return "AGUARDANDO";
    case "cancel":  return "CANCELADO";
    default:        return "AGUARDANDO";
  }
};

function AgendamentoAdmin() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin,     setNomeAdmin]     = useState("Admin");
  const [agendamentos,  setAgendamentos]  = useState([]);
  const [carregando,    setCarregando]    = useState(true);
  const [busca,         setBusca]         = useState("");
  const [filtroStatus,  setFiltroStatus]  = useState("todos");
  const [filtroServico, setFiltroServico] = useState("todos");
  const [pagina,        setPagina]        = useState(1);
  const [modalItem,     setModalItem]     = useState(null);

  const menuItems = [
    { icone: <FaTachometerAlt />, label: "Dashboard",     path: "/admin"               },
    { icone: <FaCalendarAlt />,   label: "Agendamentos",  path: "/admin/agendamentos"  },
    { icone: <FaUsers />,         label: "Clientes",      path: "/admin/clientes"      },
    { icone: <FaDollarSign />,    label: "Financeiro",    path: "#"                    },
    { icone: <FaClock />,         label: "Máquinas",      path: "/admin/maquinas"      },
    { icone: <FaBullhorn />,      label: "Novidades",     path: "/admin/novidades"     },
    { icone: <FaCog />,           label: "Configurações", path: "/admin/configuracoes" },
  ];

  const carregarAgendamentos = async () => {
    setCarregando(true);
    try {
      const res = await api.get('/api/agendamentos');
      const formatados = res.data.map((ag) => ({
        id:      `#${String(ag.id).padStart(3, '0')}`,
        idReal:  ag.id,
        cliente: ag.nomeCliente || "—",
        servico: ag.servico     || "—",
        data:    ag.data        || "—",
        horario: ag.horario     || "—",
        valor:   ag.valor != null
                   ? `R$ ${Number(ag.valor).toFixed(2).replace('.', ',')}`
                   : "R$ 0,00",
        status:  mapStatus(ag.status),
      }));
      setAgendamentos(formatados);
    } catch {
      toast.error("Erro ao carregar agendamentos!");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.nome) setNomeAdmin(user.nome);
    carregarAgendamentos();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const mudarStatus = async (novoStatus) => {
    try {
      await api.put(`/api/agendamentos/${modalItem.idReal}/status`, { status: mapStatusBack(novoStatus) });
      setAgendamentos(prev =>
        prev.map(ag => ag.idReal === modalItem.idReal ? { ...ag, status: novoStatus } : ag)
      );
      setModalItem(prev => ({ ...prev, status: novoStatus }));
      toast.success("Status atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar status!");
    }
  };

  const deletarAgendamento = async (idReal) => {
    if (!window.confirm("Deseja cancelar este agendamento?")) return;
    try {
      await api.delete(`/api/agendamentos/${idReal}`);
      setAgendamentos(prev => prev.filter(ag => ag.idReal !== idReal));
      if (modalItem?.idReal === idReal) setModalItem(null);
      toast.success("Agendamento cancelado!");
    } catch {
      toast.error("Erro ao cancelar agendamento!");
    }
  };

  const dadosFiltrados = agendamentos.filter(item => {
    const buscaOk   = item.cliente.toLowerCase().includes(busca.toLowerCase()) ||
                      item.id.toLowerCase().includes(busca.toLowerCase());
    const statusOk  = filtroStatus  === "todos" || item.status  === filtroStatus;
    const servicoOk = filtroServico === "todos" || item.servico === filtroServico;
    return buscaOk && statusOk && servicoOk;
  });

  const totalPaginas = Math.ceil(dadosFiltrados.length / POR_PAGINA);
  const dadosPagina  = dadosFiltrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <section className="admin-layout">

      {sidebarAberta && (
        <div className="admin-overlay" onClick={() => setSidebarAberta(false)} />
      )}

      <aside className={`admin-sidebar ${sidebarAberta ? "aberta" : ""}`}>
        <div className="admin-sidebar-header">
          <h2>Lava Mais</h2>
          <p>Painel Admin</p>
        </div>
        <nav className="admin-sidebar-nav">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`admin-sidebar-item ${location.pathname === item.path ? "active" : ""}`}
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

      <main className="admin-main">
        <header className="admin-header">
          <section className="admin-header-left">
            <button className="admin-btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
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

            <div className="aad-page-title">
              <div>
                <h3>Gerenciamento de</h3>
                <p>Agendamentos</p>
              </div>
              <button className="aad-btn-refresh" onClick={carregarAgendamentos} title="Atualizar">
                <FaSync /> Atualizar
              </button>
            </div>

            <div className="admin-panel aad-painel-full">
              <div className="aad-filtros">
                <div className="aad-busca">
                  <FaSearch className="aad-busca-icone" />
                  <input
                    className="aad-busca-input"
                    placeholder="Buscar por cliente ou ID..."
                    value={busca}
                    onChange={e => { setBusca(e.target.value); setPagina(1); }}
                  />
                </div>
                <div className="aad-selects">
                  <div className="aad-select-wrapper">
                    <FaFilter className="aad-select-icone" />
                    <select className="aad-select" value={filtroStatus} onChange={e => { setFiltroStatus(e.target.value); setPagina(1); }}>
                      <option value="todos">Todos os status</option>
                      <option value="ok">Concluído</option>
                      <option value="andando">Em andamento</option>
                      <option value="pending">Aguardando</option>
                      <option value="cancel">Cancelado</option>
                    </select>
                  </div>
                  <div className="aad-select-wrapper">
                    <FaFilter className="aad-select-icone" />
                    <select className="aad-select" value={filtroServico} onChange={e => { setFiltroServico(e.target.value); setPagina(1); }}>
                      <option value="todos">Todos os serviços</option>
                      <option value="Lavagem">Lavagem</option>
                      <option value="Secagem">Secagem</option>
                      <option value="Lav. + Sec.">Lav. + Sec.</option>
                    </select>
                  </div>
                </div>
              </div>

              <p className="aad-resumo-filtro">
                {carregando
                  ? "Carregando..."
                  : `${dadosFiltrados.length} agendamento${dadosFiltrados.length !== 1 ? "s" : ""} encontrado${dadosFiltrados.length !== 1 ? "s" : ""}`
                }
              </p>

              <div className="aad-tabela-wrapper">
                <table className="admin-table aad-tabela">
                  <thead>
                    <tr>
                      <th>ID</th><th>Cliente</th><th>Serviço</th><th>Data</th>
                      <th>Horário</th><th>Valor</th><th>Status</th><th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carregando ? (
                      <tr><td colSpan={8} className="aad-vazio">Carregando agendamentos...</td></tr>
                    ) : dadosPagina.length === 0 ? (
                      <tr><td colSpan={8} className="aad-vazio">Nenhum agendamento encontrado.</td></tr>
                    ) : dadosPagina.map((item, i) => (
                      <tr key={i} className="aad-linha">
                        <td className="aad-id">{item.id}</td>
                        <td className="aad-cliente-nome">{item.cliente}</td>
                        <td>{item.servico}</td>
                        <td>{item.data}</td>
                        <td>
                          <span className="aad-horario">
                            <FaClock style={{ fontSize: "0.7rem" }} /> {item.horario}
                          </span>
                        </td>
                        <td className="aad-valor">{item.valor}</td>
                        <td>
                          <span className={`status-pill ${item.status}`}>
                            <span className="status-icone">{STATUS_LABEL[item.status].icone}</span>
                            {STATUS_LABEL[item.status].label}
                          </span>
                        </td>
                        <td>
                          <div className="aad-acoes">
                            <button className="aad-btn-acao ver"      title="Ver detalhes" onClick={() => setModalItem(item)}><FaEye /></button>
                            <button className="aad-btn-acao editar"   title="Editar"       onClick={() => setModalItem(item)}><FaEdit /></button>
                            <button className="aad-btn-acao cancelar" title="Deletar"      onClick={() => deletarAgendamento(item.idReal)}><FaTimes /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPaginas > 1 && (
                <div className="aad-paginacao">
                  <button className="aad-pag-btn" disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}><FaChevronLeft /></button>
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
                    <button key={p} className={`aad-pag-btn ${pagina === p ? "ativo" : ""}`} onClick={() => setPagina(p)}>{p}</button>
                  ))}
                  <button className="aad-pag-btn" disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)}><FaChevronRight /></button>
                  <span className="aad-pag-info">Página {pagina} de {totalPaginas}</span>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>

      {modalItem && (
        <div className="aad-modal-overlay" onClick={() => setModalItem(null)}>
          <div className="aad-modal" onClick={e => e.stopPropagation()}>
            <div className="aad-modal-header">
              <h3>Detalhes do Agendamento {modalItem.id}</h3>
              <button className="aad-modal-close" onClick={() => setModalItem(null)}><FaTimes /></button>
            </div>
            <div className="aad-modal-body">
              {[
                ["Cliente",  modalItem.cliente],
                ["Serviço",  modalItem.servico],
                ["Data",     modalItem.data],
                ["Horário",  modalItem.horario],
                ["Valor",    modalItem.valor],
              ].map(([label, value]) => (
                <div className="aad-modal-row" key={label}>
                  <span className="aad-modal-label">{label}</span>
                  <span className="aad-modal-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="aad-modal-footer">
              <p className="aad-modal-footer-label">Alterar status:</p>
              <div className="aad-modal-status-btns">
                {Object.entries(STATUS_LABEL).map(([key, val]) => (
                  <button
                    key={key}
                    className={`aad-status-btn ${modalItem.status === key ? "ativo" : ""}`}
                    onClick={() => mudarStatus(key)}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default AgendamentoAdmin;