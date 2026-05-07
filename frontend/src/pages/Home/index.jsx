import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt, FaHistory, FaCreditCard, FaClock, FaBars, FaBullhorn, 
  FaWhatsapp, FaInstagram, FaArrowLeft, FaCheckCircle, FaRegCircle, 
  FaTshirt, FaWind, FaWater, FaRegClock, FaCalendarDay, FaShoppingCart, 
  FaTrash, FaTimes, FaQrcode, FaMoneyBill, FaHandHoldingUsd, FaFileInvoice, 
  FaDownload, FaEye, FaReceipt
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [mostrarPagamentosLista, setMostrarPagamentosLista] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [passo, setPasso] = useState(1);
  const [tipoServico, setTipoServico] = useState("");
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [precoTotal, setPrecoTotal] = useState(0);
  const [agendamentos, setAgendamentos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [reciboSelecionado, setReciboSelecionado] = useState(null);
  
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);

  const [lavadoras, setLavadoras] = useState([
    { id: "L1", nome: "Lavadora 1", disponivel: true, ocupada: false },
    { id: "L2", nome: "Lavadora 2", disponivel: true, ocupada: false },
    { id: "L3", nome: "Lavadora 3", disponivel: false, ocupada: true },
    { id: "L4", nome: "Lavadora 4", disponivel: true, ocupada: false }
  ]);

  const [secadoras, setSecadoras] = useState([
    { id: "S1", nome: "Secadora 1", disponivel: true, ocupada: false },
    { id: "S2", nome: "Secadora 2", disponivel: true, ocupada: false },
    { id: "S3", nome: "Secadora 3", disponivel: false, ocupada: true },
    { id: "S4", nome: "Secadora 4", disponivel: true, ocupada: false }
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) {
      setNomeUsuario(user.nome);
    }
    
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItensCarrinho(carrinhoSalvo);
    calcularTotalCarrinho(carrinhoSalvo);
    
    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    setAgendamentos(agendamentosSalvos);
    
    // Carregar pagamentos do localStorage
    const pagamentosSalvos = JSON.parse(localStorage.getItem('pagamentos')) || [];
    if (pagamentosSalvos.length === 0) {
      const pagamentosExemplo = agendamentosSalvos.map((agendamento, index) => ({
        id: Date.now() + index,
        agendamentoId: agendamento.id,
        servico: agendamento.nome,
        descricao: agendamento.descricao,
        data: agendamento.data,
        horario: agendamento.horario,
        maquina: agendamento.maquina,
        valor: agendamento.preco,
        status: index % 2 === 0 ? "pago" : "pendente",
        dataPagamento: index % 2 === 0 ? new Date().toLocaleDateString('pt-BR') : null,
        formaPagamento: index % 2 === 0 ? "PIX" : null,
      }));
      setPagamentos(pagamentosExemplo);
      localStorage.setItem('pagamentos', JSON.stringify(pagamentosExemplo));
    } else {
      setPagamentos(pagamentosSalvos);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const calcularTotalCarrinho = (itens) => {
    const soma = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    setTotalCarrinho(soma);
  };

  const adicionarAoCarrinho = (servico) => {
    const carrinhoAtual = [...itensCarrinho];
    const itemExistente = carrinhoAtual.find(item => item.id === servico.id);
    
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinhoAtual.push({ ...servico, quantidade: 1 });
    }
    
    setItensCarrinho(carrinhoAtual);
    calcularTotalCarrinho(carrinhoAtual);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
  };

  const atualizarQuantidade = (index, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    const novosItens = [...itensCarrinho];
    novosItens[index].quantidade = novaQuantidade;
    setItensCarrinho(novosItens);
    calcularTotalCarrinho(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const removerItem = (index) => {
    const novosItens = itensCarrinho.filter((_, i) => i !== index);
    setItensCarrinho(novosItens);
    calcularTotalCarrinho(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
    setTotalCarrinho(0);
    localStorage.removeItem('carrinho');
  };

  const abrirPagamento = () => {
    setCarrinhoAberto(false);
    setMostrarPagamento(true);
    setFormaPagamento("");
    setPagamentoConfirmado(false);
  };

  const handleFinalizarPagamento = () => {
    if (!formaPagamento) {
      alert("Selecione uma forma de pagamento!");
      return;
    }
    setPagamentoConfirmado(true);
    
    setTimeout(() => {
      localStorage.removeItem('carrinho');
      setItensCarrinho([]);
      setTotalCarrinho(0);
      setMostrarPagamento(false);
      setPagamentoConfirmado(false);
      setFormaPagamento("");
      alert("Pedido finalizado com sucesso!");
    }, 2000);
  };

  const voltarParaHome = () => {
    setMostrarAgendamento(false);
    setMostrarHistorico(false);
    setMostrarPagamento(false);
    setMostrarPagamentosLista(false);
    setPagamentoConfirmado(false);
    setFormaPagamento("");
    setPasso(1);
    setTipoServico("");
    setMaquinaSelecionada(null);
    setDataSelecionada("");
    setHorarioSelecionado("");
    setReciboSelecionado(null);
  };

  const handleDownloadRecibo = (pagamento) => {
    if (pagamento.status === "pago") {
      alert(`📄 Download do recibo:\n\nServiço: ${pagamento.servico}\nValor: R$ ${pagamento.valor.toFixed(2)}\nData: ${pagamento.data}\nForma de Pagamento: ${pagamento.formaPagamento}`);
    } else {
      alert("Este pagamento ainda não foi realizado.");
    }
  };

  const getStatusIcon = (status) => {
    if (status === "pago") {
      return <FaCheckCircle className="status-icon-pag pago" />;
    }
    return <FaClock className="status-icon-pag pendente" />;
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

  const selecionarTipoServico = (tipo) => {
    setTipoServico(tipo);
    setPrecoTotal(tipo === "lavagem" ? 30 : 20);
    setPasso(2);
  };

  const selecionarMaquina = (maquina) => {
    if (!maquina.disponivel || maquina.ocupada) return;
    setMaquinaSelecionada(maquina);
  };

  const proximoPasso = () => {
    if (passo === 2 && !maquinaSelecionada) {
      alert("Selecione uma máquina!");
      return;
    }
    if (passo === 3 && (!dataSelecionada || !horarioSelecionado)) {
      alert("Selecione data e horário!");
      return;
    }
    setPasso(passo + 1);
  };

  const voltarPasso = () => {
    setPasso(passo - 1);
  };

  const confirmarAgendamento = () => {
    let nomeServico = "";
    let descricaoServico = "";
    let preco = tipoServico === "lavagem" ? 30 : 20;
    
    if (tipoServico === "lavagem") {
      nomeServico = "Lavagem";
      descricaoServico = "Lavagem + Atendimento";
    } else {
      nomeServico = "Secagem";
      descricaoServico = "Secagem + Atendimento";
    }
    
    const novoServico = {
      id: Date.now(),
      nome: nomeServico,
      descricao: descricaoServico,
      maquina: maquinaSelecionada.nome,
      tipoServico: tipoServico,
      data: dataSelecionada,
      horario: horarioSelecionado,
      preco: preco,
      quantidade: 1,
      status: "Agendado",
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };
    
    const novosAgendamentos = [...agendamentos, novoServico];
    setAgendamentos(novosAgendamentos);
    localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
    
    adicionarAoCarrinho({ ...novoServico });
    
    alert(`Serviço adicionado ao carrinho!\n\n${nomeServico}\nMáquina: ${maquinaSelecionada.nome}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}\nValor: R$ ${preco.toFixed(2)}`);
    
    voltarParaHome();
  };

  const horarios = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const gerarDatas = () => {
    const datas = [];
    for (let i = 0; i < 7; i++) {
      const data = new Date();
      data.setDate(data.getDate() + i);
      datas.push(data.toLocaleDateString('pt-BR'));
    }
    return datas;
  };

  const datasDisponiveis = gerarDatas();

  // TELA DE LISTA DE PAGAMENTOS
  if (mostrarPagamentosLista) {
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
            <div className="pagamentos-container">
              {/* Cards de resumo */}
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

              {/* Filtros */}
              <div className="filtros-pagamentos">
                <button className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`} onClick={() => setFiltro('todos')}>Todos</button>
                <button className={`filtro-btn ${filtro === 'pago' ? 'active' : ''}`} onClick={() => setFiltro('pago')}>Pagos</button>
                <button className={`filtro-btn ${filtro === 'pendente' ? 'active' : ''}`} onClick={() => setFiltro('pendente')}>Pendentes</button>
              </div>

              {/* Lista de pagamentos */}
              <div className="pagamentos-lista">
                {pagamentosFiltrados.length === 0 ? (
                  <div className="pagamentos-vazio">
                    <FaFileInvoice className="icone-vazio" />
                    <p>Nenhum pagamento encontrado</p>
                  </div>
                ) : (
                  pagamentosFiltrados.map((pagamento) => (
                    <div key={pagamento.id} className={`pagamento-card ${pagamento.status}`}>
                      <div className="pagamento-header-card">
                        <div className="servico-info">
                          <h3>{pagamento.servico}</h3>
                          <p>{pagamento.descricao}</p>
                        </div>
                        {getStatusIcon(pagamento.status)}
                        <span className="status-text">{getStatusText(pagamento.status)}</span>
                      </div>
                      <div className="pagamento-detalhes">
                        <div className="detalhe-item"><span>📅 Data:</span><strong>{pagamento.data}</strong></div>
                        <div className="detalhe-item"><span>⏰ Horário:</span><strong>{pagamento.horario}</strong></div>
                        <div className="detalhe-item"><span>🧺 Máquina:</span><strong>{pagamento.maquina}</strong></div>
                        <div className="detalhe-item valor"><span>💰 Valor:</span><strong>R$ {pagamento.valor.toFixed(2)}</strong></div>
                        {pagamento.status === "pago" && (
                          <>
                            <div className="detalhe-item"><span>📆 Data Pagamento:</span><strong>{pagamento.dataPagamento}</strong></div>
                            <div className="detalhe-item"><span>💳 Forma:</span><strong>{pagamento.formaPagamento}</strong></div>
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
      </section>
    );
  }

  // Modal de Recibo
  if (reciboSelecionado) {
    return (
      <section className="home-layout">
        <Sidebar aberta={sidebarAberta} setAberta={setSidebarAberta} navigate={navigate} handleLogout={handleLogout} />
        <main className="main-content">
          <header className="header-home">
            <section className="header-left">
              <button className="btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
              <button className="btn-voltar-agendamento" onClick={() => setReciboSelecionado(null)}>
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
            <div className="modal-recibo-container">
              <div className="modal-recibo">
                <div className="modal-header">
                  <h2><FaReceipt /> Recibo de Pagamento</h2>
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
          </section>
        </main>
      </section>
    );
  }

  // TELA DE PAGAMENTO DO CARRINHO
  if (mostrarPagamento) {
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
            <section className="header-right">
              <button className="btn-carrinho" onClick={() => setCarrinhoAberto(true)}>
                <FaShoppingCart />
                {itensCarrinho.length > 0 && <span className="carrinho-badge">{itensCarrinho.length}</span>}
              </button>
              <section className="avatar-circle">
                {nomeUsuario ? nomeUsuario.charAt(0) : "C"}
              </section>
            </section>
          </header>

          <section className="home-body">
            <div className="pagamento-container">
              <div className="pagamento-card">
                {pagamentoConfirmado ? (
                  <div className="confirmado-card">
                    <FaCheckCircle className="icone-confirmado" />
                    <h2>Pedido Confirmado!</h2>
                    <p>Seu pedido foi realizado com sucesso.</p>
                    <button className="btn-voltar-home" onClick={voltarParaHome}>Voltar para Home</button>
                  </div>
                ) : (
                  <>
                    <div className="pagamento-header"><h2><FaCreditCard /> Finalizar Pedido</h2></div>
                    <div className="resumo-pedido-pagamento">
                      <h3>Resumo do Pedido</h3>
                      <div className="itens-pagamento">
                        {itensCarrinho.map((item, index) => (
                          <div key={index} className="item-pagamento">
                            <div className="item-pagamento-info">
                              <h4>{item.nome}</h4>
                              <p>{item.descricao}</p>
                              <div className="item-pagamento-detalhes">
                                <span><FaCalendarDay /> {item.data}</span>
                                <span><FaRegClock /> {item.horario}</span>
                                <span><FaTshirt /> {item.maquina}</span>
                              </div>
                            </div>
                            <div className="item-pagamento-preco"><strong>R$ {item.preco.toFixed(2)}</strong></div>
                          </div>
                        ))}
                      </div>
                      <div className="total-pagamento"><span>Total do pedido:</span><strong>R$ {totalCarrinho.toFixed(2)}</strong></div>
                    </div>
                    <div className="formas-pagamento">
                      <h3>Escolha a forma de pagamento</h3>
                      <div className="opcoes-pagamento">
                        <div className={`opcao-pagamento ${formaPagamento === 'pix_online' ? 'selecionada' : ''}`} onClick={() => setFormaPagamento('pix_online')}>
                          <FaQrcode className="opcao-icon" />
                          <div className="opcao-info"><h4>PIX Online</h4><p>Pagamento instantâneo via QR Code</p></div>
                          {formaPagamento === 'pix_online' && <FaCheckCircle className="opcao-check" />}
                        </div>
                        <div className={`opcao-pagamento ${formaPagamento === 'estabelecimento' ? 'selecionada' : ''}`} onClick={() => setFormaPagamento('estabelecimento')}>
                          <FaHandHoldingUsd className="opcao-icon" />
                          <div className="opcao-info"><h4>Pagar no Estabelecimento</h4><p>Pagamento na loja com Crédito, Débito ou PIX</p></div>
                          {formaPagamento === 'estabelecimento' && <FaCheckCircle className="opcao-check" />}
                        </div>
                      </div>
                    </div>
                    <div className="pagamento-footer">
                      <div className="total-final"><span>Total a pagar:</span><strong>R$ {totalCarrinho.toFixed(2)}</strong></div>
                      <button className="btn-finalizar-pagamento" onClick={handleFinalizarPagamento}><FaCheckCircle /> Finalizar Pedido</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </section>
    );
  }

  // TELA DE HISTÓRICO
  if (mostrarHistorico) {
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
            <section className="header-right">
              <button className="btn-carrinho" onClick={() => setCarrinhoAberto(true)}>
                <FaShoppingCart />
                {itensCarrinho.length > 0 && <span className="carrinho-badge">{itensCarrinho.length}</span>}
              </button>
              <section className="avatar-circle">
                {nomeUsuario ? nomeUsuario.charAt(0) : "C"}
              </section>
            </section>
          </header>

          <section className="home-body">
            <div className="historico-container">
              <div className="historico-header">
                <h2><FaHistory /> Meu Histórico</h2>
                <p>Seus agendamentos realizados</p>
              </div>
              {agendamentos.length === 0 ? (
                <div className="historico-vazio">
                  <FaHistory className="icone-vazio" />
                  <p>Você ainda não tem agendamentos</p>
                  <button className="btn-agendar" onClick={() => setMostrarAgendamento(true)}><FaCalendarAlt /> Fazer primeiro agendamento</button>
                </div>
              ) : (
                <div className="historico-lista">
                  {agendamentos.map((item) => (
                    <div key={item.id} className="historico-card">
                      <div className="historico-card-header">
                        <h3>{item.nome}</h3>
                        <span className="status-agendado"><FaCheckCircle /> Agendado</span>
                      </div>
                      <div className="historico-card-body">
                        <div className="historico-info">
                          <p><FaCalendarDay /> Data: {item.data}</p>
                          <p><FaRegClock /> Horário: {item.horario}</p>
                          <p><FaTshirt /> Máquina: {item.maquina}</p>
                          <p><FaMoneyBill /> Valor: R$ {item.preco.toFixed(2)}</p>
                          <p><FaCalendarAlt /> Agendado em: {item.dataCriacao}</p>
                        </div>
                        <button className="btn-cancelar-agendamento" onClick={() => {
                          const novosAgendamentos = agendamentos.filter(a => a.id !== item.id);
                          setAgendamentos(novosAgendamentos);
                          localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
                        }}><FaTimes /> Cancelar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </section>
    );
  }

  // TELA DE AGENDAMENTO
  if (mostrarAgendamento) {
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
            <section className="header-right">
              <button className="btn-carrinho" onClick={() => setCarrinhoAberto(true)}>
                <FaShoppingCart />
                {itensCarrinho.length > 0 && <span className="carrinho-badge">{itensCarrinho.length}</span>}
              </button>
              <section className="avatar-circle">
                {nomeUsuario ? nomeUsuario.charAt(0) : "C"}
              </section>
            </section>
          </header>

          <section className="home-body">
            <div className="agendamento-container">
              <div className="step-indicator">
                <div className={`step ${passo >= 1 ? 'active' : ''}`}>1</div>
                <div className={`step-line ${passo >= 2 ? 'active' : ''}`}></div>
                <div className={`step ${passo >= 2 ? 'active' : ''}`}>2</div>
                <div className={`step-line ${passo >= 3 ? 'active' : ''}`}></div>
                <div className={`step ${passo >= 3 ? 'active' : ''}`}>3</div>
                <div className={`step-line ${passo >= 4 ? 'active' : ''}`}></div>
                <div className={`step ${passo >= 4 ? 'active' : ''}`}>4</div>
              </div>
              {passo === 1 && (
                <div className="passo-content">
                  <h2>Escolha o tipo de serviço</h2>
                  <div className="tipos-grid">
                    <div className="tipo-card" onClick={() => selecionarTipoServico("lavagem")}>
                      <FaWater className="tipo-icon" /><h3>Lavagem</h3><p>Lavagem + Atendimento</p><strong>R$ 30,00</strong>
                    </div>
                    <div className="tipo-card" onClick={() => selecionarTipoServico("secagem")}>
                      <FaWind className="tipo-icon" /><h3>Secagem</h3><p>Secagem + Atendimento</p><strong>R$ 20,00</strong>
                    </div>
                  </div>
                </div>
              )}
              {passo === 2 && (
                <div className="passo-content">
                  <h2>{tipoServico === "lavagem" ? "Escolha a lavadora" : "Escolha a secadora"}</h2>
                  <div className="maquinas-grid">
                    {(tipoServico === "lavagem" ? lavadoras : secadoras).map((maq) => (
                      <div key={maq.id} className={`maquina-card ${!maq.disponivel || maq.ocupada ? 'indisponivel' : ''} ${maquinaSelecionada?.id === maq.id ? 'selecionada' : ''}`} onClick={() => selecionarMaquina(maq)}>
                        {tipoServico === "lavagem" ? <FaTshirt className="maquina-icon" /> : <FaWind className="maquina-icon" />}
                        <span className="maquina-nome">{maq.nome}</span>
                        {!maq.disponivel || maq.ocupada ? <span className="status">Indisponível</span> : maquinaSelecionada?.id === maq.id ? <FaCheckCircle className="status-ok" /> : <FaRegCircle className="status-circle" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {passo === 3 && (
                <div className="passo-content">
                  <h2>Escolha data e horário</h2>
                  <div className="datas-section"><h3><FaCalendarDay /> Data</h3><div className="datas-grid">{datasDisponiveis.map((data, idx) => (<div key={idx} className={`data-card ${dataSelecionada === data ? 'selecionada' : ''}`} onClick={() => setDataSelecionada(data)}>{data}</div>))}</div></div>
                  <div className="horarios-section"><h3><FaRegClock /> Horário</h3><div className="horarios-grid">{horarios.map((horario) => (<div key={horario} className={`horario-card ${horarioSelecionado === horario ? 'selecionado' : ''}`} onClick={() => setHorarioSelecionado(horario)}>{horario}</div>))}</div></div>
                </div>
              )}
              {passo === 4 && (
                <div className="passo-content">
                  <h2>Confirme seu agendamento</h2>
                  <div className="confirmacao-card">
                    <div className="confirmacao-item"><span>Tipo:</span><strong>{tipoServico === "lavagem" ? "Lavagem" : "Secagem"}</strong></div>
                    <div className="confirmacao-item"><span>Máquina:</span><strong>{maquinaSelecionada?.nome}</strong></div>
                    <div className="confirmacao-item"><span>Data:</span><strong>{dataSelecionada}</strong></div>
                    <div className="confirmacao-item"><span>Horário:</span><strong>{horarioSelecionado}</strong></div>
                    <div className="confirmacao-item total"><span>Total:</span><strong>R$ {precoTotal.toFixed(2)}</strong></div>
                  </div>
                </div>
              )}
              <div className="botoes-agendamento">
                {passo > 1 && <button className="btn-voltar" onClick={voltarPasso}><FaArrowLeft /> Voltar</button>}
                <button className="btn-cancelar" onClick={voltarParaHome}>Cancelar</button>
                {passo < 4 ? <button className="btn-proximo" onClick={proximoPasso}>Próximo →</button> : <button className="btn-confirmar" onClick={confirmarAgendamento}><FaShoppingCart /> Adicionar ao Carrinho</button>}
              </div>
            </div>
          </section>
        </main>
      </section>
    );
  }

  // TELA PRINCIPAL HOME
  return (
    <section className="home-layout">
      <Sidebar aberta={sidebarAberta} setAberta={setSidebarAberta} navigate={navigate} handleLogout={handleLogout} />
      <main className="main-content">
        <header className="header-home">
          <section className="header-left">
            <button className="btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
            <section className="welcome-text">
              <span>Bem-vindo de volta,</span>
              <h2 className="user">{nomeUsuario}</h2>
            </section>
          </section>
          <section className="header-right">
            <button className="btn-carrinho" onClick={() => setCarrinhoAberto(true)}>
              <FaShoppingCart />
              {itensCarrinho.length > 0 && <span className="carrinho-badge">{itensCarrinho.length}</span>}
            </button>
            <section className="avatar-circle">{nomeUsuario ? nomeUsuario.charAt(0) : "C"}</section>
          </section>
        </header>

        <section className="home-body">
          <section className="section-area">
            <h4>NOSSOS SERVIÇOS</h4>
            <section className="unified-grid">
              <section className="card-destaque-vertical" onClick={() => setMostrarAgendamento(true)}>
                <FaCalendarAlt className="icon-main" />
                <section className="info">
                  <h5>Agendamento</h5>
                  <p>Reserve sua máquina agora mesmo</p>
                </section>
              </section>

              <section className="sub-grid-services">
                <section className="card-mini purple" onClick={() => setMostrarHistorico(true)}>
                  <FaHistory />
                  <div className="info"><h5>Histórico</h5><p>Seus agendamentos</p></div>
                </section>

                <section className="card-mini cyan" onClick={() => setMostrarPagamentosLista(true)}>
                  <FaCreditCard />
                  <div className="info"><h5>Pagamentos</h5><p>Faturas e recibos</p></div>
                </section>

                <section className="card-mini purple">
                  <FaClock />
                  <div className="info"><h5>Status</h5><p>Acompanhe sua lavagem</p></div>
                </section>

                <section className="card-mini cyan">
                  <FaBullhorn />
                  <div className="info"><h5>Novidades</h5><p>Confira as ofertas</p></div>
                </section>

                <section className="card-mini purple" onClick={() => window.open('https://wa.me/5587992433763', '_blank')}>
                  <FaWhatsapp />
                  <div className="info"><h5>Suporte</h5><p>Fale conosco</p></div>
                </section>

                <section className="card-mini cyan" onClick={() => window.open('https://www.instagram.com/lavamais_sertania/', '_blank')}>
                  <FaInstagram />
                  <div className="info"><h5>Siga-nos</h5><p>No Instagram</p></div>
                </section>
              </section>
            </section>
          </section>
        </section>
      </main>

      {/* MODAL DO CARRINHO */}
      {carrinhoAberto && (
        <div className="carrinho-modal-overlay" onClick={() => setCarrinhoAberto(false)}>
          <div className="carrinho-modal" onClick={(e) => e.stopPropagation()}>
            <div className="carrinho-header"><h2>Seu Carrinho</h2><button className="btn-fechar" onClick={() => setCarrinhoAberto(false)}>✕</button></div>
            {itensCarrinho.length === 0 ? (
              <div className="carrinho-vazio"><p>Seu carrinho está vazio</p><button className="btn-continuar" onClick={() => setCarrinhoAberto(false)}>Continuar comprando</button></div>
            ) : (
              <>
                <div className="carrinho-itens">
                  {itensCarrinho.map((item, index) => (
                    <div key={index} className="carrinho-item">
                      <div className="item-info">
                        <h4>{item.nome}</h4><p>{item.descricao}</p>
                        {item.data && <p className="item-data"><FaCalendarDay /> {item.data} - <FaRegClock /> {item.horario}</p>}
                        {item.maquina && <p className="item-maquina"><FaTshirt /> {item.maquina}</p>}
                        <span className="item-preco">R$ {item.preco.toFixed(2)}</span>
                      </div>
                      <div className="item-actions">
                        <div className="quantidade-control">
                          <button onClick={() => atualizarQuantidade(index, item.quantidade - 1)}>-</button>
                          <span>{item.quantidade}</span>
                          <button onClick={() => atualizarQuantidade(index, item.quantidade + 1)}>+</button>
                        </div>
                        <button className="btn-remover" onClick={() => removerItem(index)}><FaTrash /> Remover</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="carrinho-footer">
                  <div className="resumo-pedido"><span>Total do pedido</span><div className="total"><strong>R$ {totalCarrinho.toFixed(2)}</strong></div></div>
                  <div className="carrinho-botoes">
                    <button className="btn-limpar" onClick={limparCarrinho}>Limpar Carrinho</button>
                    <button className="btn-finalizar" onClick={abrirPagamento}><FaCreditCard /> Finalizar Pedido</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;