import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaClock, FaFileInvoice, FaDownload, FaEye, FaBars, FaCalendarDay, FaRegClock, FaTshirt, FaMoneyBill } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Pagamentos.css";

function Pagamentos() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [pagamentos, setPagamentos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [reciboSelecionado, setReciboSelecionado] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) {
      setNomeUsuario(user.nome);
    }
    
    const pagamentosSalvos = JSON.parse(localStorage.getItem('pagamentos')) || [];
    setPagamentos(pagamentosSalvos);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDownloadRecibo = (pagamento) => {
    if (pagamento.status === "pago") {
      alert(`Download do recibo:\n\nServiço: ${pagamento.servico}\nValor: R$ ${pagamento.valor.toFixed(2)}\nData: ${pagamento.data}\nForma de Pagamento: ${pagamento.formaPagamento}`);
    } else {
      alert("Este pagamento ainda não foi realizado.");
    }
  };

  const getStatusIcon = (status) => {
    return status === "pago" ? <FaCheckCircle className="status-icon pago" /> : <FaClock className="status-icon pendente" />;
  };

  const getStatusText = (status) => {
    return status === "pago" ? "Pago" : "Pendente";
  };

  const pagamentosFiltrados = pagamentos.filter(p => {
    if (filtro === "todos") return true;
    return p.status === filtro;
  });

  const totalPago = pagamentos.filter(p => p.status === "pago").reduce((acc, p) => acc + p.valor, 0);
  const totalPendente = pagamentos.filter(p => p.status === "pendente").reduce((acc, p) => acc + p.valor, 0);

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
                  <strong>{pagamentos.length}</strong>
                </div>
              </div>
            </div>

            <div className="filtros">
              <button className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`} onClick={() => setFiltro('todos')}>Todos</button>
              <button className={`filtro-btn ${filtro === 'pago' ? 'active' : ''}`} onClick={() => setFiltro('pago')}>Pagos</button>
              <button className={`filtro-btn ${filtro === 'pendente' ? 'active' : ''}`} onClick={() => setFiltro('pendente')}>Pendentes</button>
            </div>

            <div className="pagamentos-lista">
              {pagamentosFiltrados.length === 0 ? (
                <div className="pagamentos-vazio">
                  <FaFileInvoice className="icone-vazio" />
                  <p>Nenhum pagamento encontrado</p>
                </div>
              ) : (
                pagamentosFiltrados.map((pagamento) => (
                  <div key={pagamento.id} className={`pagamento-card ${pagamento.status}`}>
                    <div className="pagamento-card-header">
                      <div className="servico-info">
                        <h3>{pagamento.servico}</h3>
                        <p>{pagamento.descricao}</p>
                      </div>
                      <div className="status-area">
                        {getStatusIcon(pagamento.status)}
                        <span className={`status-badge ${pagamento.status}`}>{getStatusText(pagamento.status)}</span>
                      </div>
                    </div>
                    <div className="pagamento-detalhes">
                      <div className="detalhe"><FaCalendarDay /><span>Data:</span><strong>{pagamento.data}</strong></div>
                      <div className="detalhe"><FaRegClock /><span>Horário:</span><strong>{pagamento.horario}</strong></div>
                      <div className="detalhe"><FaTshirt /><span>Máquina:</span><strong>{pagamento.maquina}</strong></div>
                      <div className="detalhe valor"><FaMoneyBill /><span>Valor:</span><strong>R$ {pagamento.valor.toFixed(2)}</strong></div>
                      {pagamento.status === "pago" && (
                        <>
                          <div className="detalhe"><span>Data Pagamento:</span><strong>{pagamento.dataPagamento}</strong></div>
                          <div className="detalhe"><span>Forma:</span><strong>{pagamento.formaPagamento}</strong></div>
                        </>
                      )}
                    </div>
                    <div className="pagamento-actions">
                      {pagamento.status === "pago" ? (
                        <>
                          <button className="btn-recibo" onClick={() => handleDownloadRecibo(pagamento)}><FaDownload /> Baixar Recibo</button>
                          <button className="btn-detalhes" onClick={() => setReciboSelecionado(pagamento)}><FaEye /> Ver Detalhes</button>
                        </>
                      ) : (
                        <button className="btn-pagar" onClick={() => alert(`Redirecionando para pagamento do serviço: ${pagamento.servico}`)}>Pagar Agora</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modal do Recibo */}
      {reciboSelecionado && (
        <div className="modal-overlay" onClick={() => setReciboSelecionado(null)}>
          <div className="modal-recibo" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Recibo de Pagamento</h2>
              <button className="btn-fechar-modal" onClick={() => setReciboSelecionado(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="recibo-logo">
                <h3>LAVA MAIS</h3>
                <p>Lavanderia e Secagem</p>
              </div>
              <div className="recibo-dados">
                <p><strong>Nº do Documento:</strong> {reciboSelecionado.id}</p>
                <p><strong>Data do Pagamento:</strong> {reciboSelecionado.dataPagamento}</p>
                <p><strong>Forma de Pagamento:</strong> {reciboSelecionado.formaPagamento}</p>
              </div>
              <div className="recibo-servico">
                <h4>Detalhes do Serviço</h4>
                <p><strong>Serviço:</strong> {reciboSelecionado.servico}</p>
                <p><strong>Descrição:</strong> {reciboSelecionado.descricao}</p>
                <p><strong>Data:</strong> {reciboSelecionado.data}</p>
                <p><strong>Horário:</strong> {reciboSelecionado.horario}</p>
                <p><strong>Máquina:</strong> {reciboSelecionado.maquina}</p>
              </div>
              <div className="recibo-total">
                <span>Valor Pago:</span>
                <strong>R$ {reciboSelecionado.valor.toFixed(2)}</strong>
              </div>
              <div className="recibo-footer">
                <p>Este documento é válido como comprovante de pagamento</p>
                <p>Código: {Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-download-recibo" onClick={() => handleDownloadRecibo(reciboSelecionado)}><FaDownload /> Baixar PDF</button>
              <button className="btn-fechar" onClick={() => setReciboSelecionado(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Pagamentos;