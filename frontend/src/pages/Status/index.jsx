import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, FaCheckCircle, FaSpinner, FaClock, FaTshirt, 
  FaCalendarDay, FaRegClock, FaMoneyBill, FaBars 
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Status.css";

function Status() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [servicosStatus, setServicosStatus] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) {
      setNomeUsuario(user.nome);
    }
    
    // Buscar pagamentos confirmados (status "pago")
    const pagamentosSalvos = JSON.parse(localStorage.getItem('pagamentos')) || [];
    
    // Filtrar apenas os pagos e criar status
    const pagamentosPagos = pagamentosSalvos.filter(p => p.status === "pago");
    
    // Adicionar status de progresso (simulado)
    const servicosComStatus = pagamentosPagos.map((pagamento, index) => ({
      id: pagamento.id,
      servico: pagamento.servico,
      descricao: pagamento.descricao,
      data: pagamento.data,
      horario: pagamento.horario,
      maquina: pagamento.maquina,
      valor: pagamento.valor,
      dataPagamento: pagamento.dataPagamento,
      formaPagamento: pagamento.formaPagamento,
      status: index % 3 === 0 ? "lavando" : index % 3 === 1 ? "secando" : "pronto",
      etapaAtual: index % 3 === 0 ? 2 : index % 3 === 1 ? 3 : 4,
      tempoRestante: index % 3 === 0 ? "25 min" : index % 3 === 1 ? "15 min" : null
    }));
    
    setServicosStatus(servicosComStatus);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const voltarParaHome = () => {
    navigate('/home');
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "lavando":
        return <FaSpinner className="status-icon lavando" />;
      case "secando":
        return <FaSpinner className="status-icon secando" />;
      case "pronto":
        return <FaCheckCircle className="status-icon pronto" />;
      case "finalizado":
        return <FaCheckCircle className="status-icon finalizado" />;
      default:
        return <FaClock className="status-icon pendente" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case "lavando":
        return "Em lavagem";
      case "secando":
        return "Em secagem";
      case "pronto":
        return "Pronto para retirada";
      case "finalizado":
        return "Finalizado";
      default:
        return "Aguardando";
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "lavando":
        return "lavando";
      case "secando":
        return "secando";
      case "pronto":
        return "pronto";
      case "finalizado":
        return "finalizado";
      default:
        return "pendente";
    }
  };

  const getStepStatus = (etapa, etapaAtual) => {
    if (etapa < etapaAtual) return "completed";
    if (etapa === etapaAtual) return "active";
    return "pending";
  };

  // Estatísticas
  const totalServicos = servicosStatus.length;
  const servicosProntos = servicosStatus.filter(s => s.status === "pronto").length;
  const servicosEmAndamento = servicosStatus.filter(s => s.status === "lavando" || s.status === "secando").length;

  return (
    <section className="home-layout">
      <Sidebar aberta={sidebarAberta} setAberta={setSidebarAberta} navigate={navigate} handleLogout={handleLogout} />
      <main className="main-content">
        <header className="header-home">
          <section className="header-left">
            <button className="btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
            <button className="btn-voltar-agendamento" onClick={voltarParaHome}>
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
          <div className="status-container">
            {/* Cards de Resumo */}
            <div className="status-resumo-cards">
              <div className="status-resumo-card total">
                <div className="resumo-icon"><FaTshirt /></div>
                <div className="resumo-info">
                  <span>Total de Serviços</span>
                  <strong>{totalServicos}</strong>
                </div>
              </div>
              <div className="status-resumo-card andamento">
                <div className="resumo-icon"><FaSpinner /></div>
                <div className="resumo-info">
                  <span>Em Andamento</span>
                  <strong>{servicosEmAndamento}</strong>
                </div>
              </div>
              <div className="status-resumo-card pronto">
                <div className="resumo-icon"><FaCheckCircle /></div>
                <div className="resumo-info">
                  <span>Prontos para Retirada</span>
                  <strong>{servicosProntos}</strong>
                </div>
              </div>
            </div>

            {/* Lista de Status */}
            <div className="status-lista">
              {servicosStatus.length === 0 ? (
                <div className="status-vazio">
                  <FaClock className="icone-vazio" />
                  <h3>Nenhum serviço em andamento</h3>
                  <p>Após a confirmação do pagamento, o status do seu serviço aparecerá aqui.</p>
                  <button className="btn-agendar-status" onClick={() => navigate('/home')}>
                    Fazer Agendamento
                  </button>
                </div>
              ) : (
                servicosStatus.map((servico) => (
                  <div key={servico.id} className={`status-card ${getStatusColor(servico.status)}`}>
                    <div className="status-card-header">
                      <div className="servico-titulo">
                        <h3>{servico.servico}</h3>
                        <p>{servico.descricao}</p>
                      </div>
                      <div className="status-badge-area">
                        {getStatusIcon(servico.status)}
                        <span className={`status-badge ${getStatusColor(servico.status)}`}>
                          {getStatusText(servico.status)}
                        </span>
                      </div>
                    </div>

                    <div className="status-card-body">
                      <div className="servico-detalhes">
                        <div className="detalhe">
                          <FaCalendarDay />
                          <span>{servico.data}</span>
                        </div>
                        <div className="detalhe">
                          <FaRegClock />
                          <span>{servico.horario}</span>
                        </div>
                        <div className="detalhe">
                          <FaTshirt />
                          <span>{servico.maquina}</span>
                        </div>
                        <div className="detalhe">
                          <FaMoneyBill />
                          <span>R$ {servico.valor.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Timeline de Progresso */}
                      <div className="timeline">
                        <div className={`timeline-step ${getStepStatus(1, servico.etapaAtual)}`}>
                          <div className="step-dot"></div>
                          <div className="step-label">Recebido</div>
                          <div className="step-date">{servico.dataPagamento}</div>
                        </div>
                        <div className={`timeline-step ${getStepStatus(2, servico.etapaAtual)}`}>
                          <div className="step-dot"></div>
                          <div className="step-label">Lavagem</div>
                          {servico.status === "lavando" && <div className="step-time">{servico.tempoRestante}</div>}
                        </div>
                        <div className={`timeline-step ${getStepStatus(3, servico.etapaAtual)}`}>
                          <div className="step-dot"></div>
                          <div className="step-label">Secagem</div>
                          {servico.status === "secando" && <div className="step-time">{servico.tempoRestante}</div>}
                        </div>
                        <div className={`timeline-step ${getStepStatus(4, servico.etapaAtual)}`}>
                          <div className="step-dot"></div>
                          <div className="step-label">Pronto</div>
                        </div>
                      </div>

                      {servico.status === "pronto" && (
                        <div className="pronto-mensagem">
                          <FaCheckCircle />
                          <span>Seu pedido já está pronto para retirada!</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

export default Status;