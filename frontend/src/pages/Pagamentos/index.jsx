import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from 'react-toastify';
import {
  FaArrowLeft, FaCheckCircle, FaClock, FaFileInvoice,
  FaBars, FaCalendarDay, FaRegClock, FaTshirt, FaMoneyBill,
  FaHourglassHalf, FaTimes, FaSpinner
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Pagamentos.css";

const STATUS_INFO = {
  CONCLUIDO:    { label: "Concluído",    classe: "pago",      icone: <FaCheckCircle />   },
  EM_ANDAMENTO: { label: "Em andamento", classe: "pendente",  icone: <FaSpinner />       },
  AGUARDANDO:   { label: "Aguardando",   classe: "pendente",  icone: <FaHourglassHalf /> },
  CANCELADO:    { label: "Cancelado",    classe: "cancelado", icone: <FaTimes />         },
};

function Pagamentos() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario,   setNomeUsuario]   = useState("Cliente");
  const [agendamentos,  setAgendamentos]  = useState([]);
  const [carregando,    setCarregando]    = useState(true);
  const [filtro,        setFiltro]        = useState("todos");
  const [reciboSelecionado, setReciboSelecionado] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeUsuario(user.nome);

    if (user && user.id) {
      api.get(`/api/agendamentos/usuario/${user.id}`)
        .then(res => setAgendamentos(res.data))
        .catch(() => toast.error("Erro ao carregar pagamentos!"))
        .finally(() => setCarregando(false));
    } else {
      setCarregando(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const totalPago     = agendamentos.filter(a => a.status === "CONCLUIDO").reduce((acc, a) => acc + (a.valor || 0), 0);
  const totalPendente = agendamentos.filter(a => a.status === "AGUARDANDO" || a.status === "EM_ANDAMENTO").reduce((acc, a) => acc + (a.valor || 0), 0);

  const filtrados = agendamentos.filter(a => {
    if (filtro === "todos")     return true;
    if (filtro === "pago")      return a.status === "CONCLUIDO";
    if (filtro === "pendente")  return a.status === "AGUARDANDO" || a.status === "EM_ANDAMENTO";
    if (filtro === "cancelado") return a.status === "CANCELADO";
    return true;
  });

  return (
    <section className="home-layout">
      <Sidebar aberta={sidebarAberta} setAberta={setSidebarAberta} navigate={navigate} handleLogout={handleLogout} />

      <main className="main-content">
        <header className="header-home">
          <section className="header-left">
            <button className="btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
            <button className="btn-voltar-pagamentos" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Voltar
            </button>
            <section className="welcome-text">
              <span>Bem-vindo de volta,</span>
              <h2 className="user">{nomeUsuario}</h2>
            </section>
          </section>
          <section className="avatar-circle">
            {nomeUsuario ? nomeUsuario.charAt(0) : "C"}
          </section>
        </header>

        <section className="home-body">
          <div className="pagamentos-container">
            <div className="pagamentos-header">
              <h2><FaFileInvoice /> Meus Pagamentos</h2>
              <p>Faturas e recibos dos seus serviços</p>
            </div>

            <div className="resumo-cards">
              <div className="resumo-card total-pago">
                <div className="resumo-icon"><FaCheckCircle /></div>
                <div className="resumo-info">
                  <span>Total Pago</span>
                  <strong>R$ {totalPago.toFixed(2)}</strong>
                </div>
              </div>
              <div className="resumo-card total-pendente">
                <div className="resumo-icon"><FaClock /></div>
                <div className="resumo-info">
                  <span>Total Pendente</span>
                  <strong>R$ {totalPendente.toFixed(2)}</strong>
                </div>
              </div>
              <div className="resumo-card total-servicos">
                <div className="resumo-icon"><FaFileInvoice /></div>
                <div className="resumo-info">
                  <span>Total de Serviços</span>
                  <strong>{agendamentos.length}</strong>
                </div>
              </div>
            </div>

            <div className="filtros">
              <button className={`filtro-btn ${filtro === 'todos'     ? 'active' : ''}`} onClick={() => setFiltro('todos')}>Todos</button>
              <button className={`filtro-btn ${filtro === 'pago'      ? 'active' : ''}`} onClick={() => setFiltro('pago')}>Pagos</button>
              <button className={`filtro-btn ${filtro === 'pendente'  ? 'active' : ''}`} onClick={() => setFiltro('pendente')}>Pendentes</button>
              <button className={`filtro-btn ${filtro === 'cancelado' ? 'active' : ''}`} onClick={() => setFiltro('cancelado')}>Cancelados</button>
            </div>

            <div className="pagamentos-lista">
              {carregando ? (
                <div className="pagamentos-vazio"><p>Carregando...</p></div>
              ) : filtrados.length === 0 ? (
                <div className="pagamentos-vazio">
                  <FaFileInvoice className="icone-vazio" />
                  <p>Nenhum pagamento encontrado</p>
                </div>
              ) : filtrados.map((ag) => {
                const info = STATUS_INFO[ag.status] || STATUS_INFO.AGUARDANDO;
                return (
                  <div key={ag.id} className={`pagamento-card ${info.classe}`}>
                    <div className="pagamento-card-header">
                      <div className="servico-info">
                        <h3>{ag.servico}</h3>
                        <p>{ag.maquina}</p>
                      </div>
                      <div className="status-area">
                        <span className={`status-badge ${info.classe}`}>
                          {info.icone} {info.label}
                        </span>
                      </div>
                    </div>
                    <div className="pagamento-detalhes">
                      <div className="detalhe"><FaCalendarDay /><span>Data:</span><strong>{new Date(ag.data).toLocaleDateString('pt-BR')}</strong></div>
                      <div className="detalhe"><FaRegClock /><span>Horário:</span><strong>{ag.horario}</strong></div>
                      <div className="detalhe"><FaTshirt /><span>Máquina:</span><strong>{ag.maquina}</strong></div>
                      <div className="detalhe valor"><FaMoneyBill /><span>Valor:</span><strong>R$ {ag.valor?.toFixed(2)}</strong></div>
                    </div>
                    <div className="pagamento-actions">
                      {ag.status === "CONCLUIDO" && (
                        <button className="btn-recibo" onClick={() => setReciboSelecionado(ag)}>
                          <FaFileInvoice /> Ver Recibo
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {reciboSelecionado && (
        <div className="modal-overlay" onClick={() => setReciboSelecionado(null)}>
          <div className="modal-recibo" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Recibo de Pagamento</h2>
              <button className="btn-fechar-modal" onClick={() => setReciboSelecionado(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="recibo-logo">
                <h3>LAVA MAIS</h3>
                <p>Lavanderia e Secagem</p>
              </div>
              <div className="recibo-servico">
                <h4>Detalhes do Serviço</h4>
                <p><strong>Serviço:</strong> {reciboSelecionado.servico}</p>
                <p><strong>Data:</strong> {new Date(reciboSelecionado.data).toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {reciboSelecionado.horario}</p>
                <p><strong>Máquina:</strong> {reciboSelecionado.maquina}</p>
              </div>
              <div className="recibo-total">
                <span>Valor:</span>
                <strong>R$ {reciboSelecionado.valor?.toFixed(2)}</strong>
              </div>
              <div className="recibo-footer">
                <p>Código: {Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-fechar" onClick={() => setReciboSelecionado(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Pagamentos;