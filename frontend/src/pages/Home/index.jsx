import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaCreditCard, FaClock, FaBars, FaBullhorn, FaWhatsapp, FaInstagram, FaArrowLeft, FaCheckCircle, FaRegCircle, FaTshirt, FaWind, FaWater, FaSoap, FaRegClock, FaCalendarDay, FaShoppingCart, FaTrash } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);
  const [passo, setPasso] = useState(1);
  const [tipoLavagem, setTipoLavagem] = useState("");
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);
  const [secadoraSelecionada, setSecadoraSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [precoTotal, setPrecoTotal] = useState(0);
  
  // Estado do carrinho
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
    
    // Carregar carrinho do localStorage
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItensCarrinho(carrinhoSalvo);
    calcularTotalCarrinho(carrinhoSalvo);
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

  const finalizarPedido = () => {
    const mensagem = `Olá! Gostaria de finalizar meu pedido:\n\n${itensCarrinho.map(item => 
      `• ${item.nome} - Data: ${item.data || "A definir"} - Horário: ${item.horario || "A definir"} - Quantidade: ${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`
    ).join('\n')}\n\nTotal: R$ ${totalCarrinho.toFixed(2)}`;
    
    window.open(`https://wa.me/5587992433763?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const voltarParaHome = () => {
    setMostrarAgendamento(false);
    setPasso(1);
    setTipoLavagem("");
    setMaquinaSelecionada(null);
    setSecadoraSelecionada(null);
    setDataSelecionada("");
    setHorarioSelecionado("");
  };

  const selecionarTipoLavagem = (tipo) => {
    setTipoLavagem(tipo);
    setPrecoTotal(tipo === "completa" ? 30 : 10);
    setPasso(2);
  };

  const selecionarMaquina = (maquina) => {
    if (!maquina.disponivel || maquina.ocupada) return;
    setMaquinaSelecionada(maquina);
  };

  const selecionarSecadora = (secadora) => {
    if (!secadora.disponivel || secadora.ocupada) return;
    setSecadoraSelecionada(secadora);
  };

  const proximoPasso = () => {
    if (passo === 2 && !maquinaSelecionada) {
      alert("Selecione uma máquina!");
      return;
    }
    if (passo === 3 && tipoLavagem === "completa" && !secadoraSelecionada) {
      alert("Selecione uma secadora!");
      return;
    }
    if ((passo === 3 && tipoLavagem === "simples") || (passo === 4 && tipoLavagem === "completa")) {
      if (!dataSelecionada || !horarioSelecionado) {
        alert("Selecione data e horário!");
        return;
      }
    }
    setPasso(passo + 1);
  };

  const voltarPasso = () => {
    setPasso(passo - 1);
  };

  const confirmarAgendamento = () => {
    // Criar objeto do serviço para adicionar ao carrinho
    const novoServico = {
      id: Date.now(),
      nome: tipoLavagem === "completa" ? "Lavagem Completa" : "Lavagem Simples",
      descricao: tipoLavagem === "completa" ? "Lavagem + Secagem + Atendimento" : "Lavagem ou Secagem + Atendimento",
      maquina: maquinaSelecionada.nome,
      secadora: tipoLavagem === "completa" ? secadoraSelecionada.nome : null,
      data: dataSelecionada,
      horario: horarioSelecionado,
      preco: precoTotal,
      quantidade: 1
    };
    
    // Adicionar ao carrinho
    adicionarAoCarrinho(novoServico);
    
    // Mostrar mensagem de sucesso
    alert(`✅ Serviço adicionado ao carrinho!\n\n${novoServico.nome}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}\nValor: R$ ${precoTotal.toFixed(2)}`);
    
    // Voltar para a Home
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
                {tipoLavagem === "completa" && (
                  <>
                    <div className={`step-line ${passo >= 4 ? 'active' : ''}`}></div>
                    <div className={`step ${passo >= 4 ? 'active' : ''}`}>4</div>
                  </>
                )}
              </div>

              {/* PASSO 1 - TIPO LAVAGEM */}
              {passo === 1 && (
                <div className="passo-content">
                  <h2>Escolha o tipo de lavagem</h2>
                  <div className="tipos-grid">
                    <div className="tipo-card" onClick={() => selecionarTipoLavagem("completa")}>
                      <FaWater className="tipo-icon" />
                      <h3>Lavagem Completa</h3>
                      <p>Lavagem + Secagem + Atendimento</p>
                      <strong>R$ 30,00</strong>
                    </div>
                    <div className="tipo-card" onClick={() => selecionarTipoLavagem("simples")}>
                      <FaSoap className="tipo-icon" />
                      <h3>Lavagem Simples</h3>
                      <p>Lavagem ou Secagem + Atendimento</p>
                      <strong>R$ 10,00</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 2 - LAVADORA */}
              {passo === 2 && (
                <div className="passo-content">
                  <h2>Escolha a lavadora</h2>
                  <div className="maquinas-grid">
                    {lavadoras.map((maq) => (
                      <div key={maq.id} className={`maquina-card ${!maq.disponivel || maq.ocupada ? 'indisponivel' : ''} ${maquinaSelecionada?.id === maq.id ? 'selecionada' : ''}`} onClick={() => selecionarMaquina(maq)}>
                        <FaTshirt className="maquina-icon" />
                        <span className="maquina-nome">{maq.nome}</span>
                        {!maq.disponivel || maq.ocupada ? <span className="status">Indisponível</span> : maquinaSelecionada?.id === maq.id ? <FaCheckCircle className="status-ok" /> : <FaRegCircle className="status-circle" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PASSO 3 - SECADORA */}
              {passo === 3 && tipoLavagem === "completa" && (
                <div className="passo-content">
                  <h2>Escolha a secadora</h2>
                  <div className="maquinas-grid">
                    {secadoras.map((sec) => (
                      <div key={sec.id} className={`maquina-card ${!sec.disponivel || sec.ocupada ? 'indisponivel' : ''} ${secadoraSelecionada?.id === sec.id ? 'selecionada' : ''}`} onClick={() => selecionarSecadora(sec)}>
                        <FaWind className="maquina-icon" />
                        <span className="maquina-nome">{sec.nome}</span>
                        {!sec.disponivel || sec.ocupada ? <span className="status">Indisponível</span> : secadoraSelecionada?.id === sec.id ? <FaCheckCircle className="status-ok" /> : <FaRegCircle className="status-circle" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DATA E HORÁRIO */}
              {((tipoLavagem === "simples" && passo === 3) || (tipoLavagem === "completa" && passo === 4)) && (
                <div className="passo-content">
                  <h2>Escolha data e horário</h2>
                  <div className="datas-section">
                    <h3><FaCalendarDay /> Data</h3>
                    <div className="datas-grid">
                      {datasDisponiveis.map((data, idx) => (
                        <div key={idx} className={`data-card ${dataSelecionada === data ? 'selecionada' : ''}`} onClick={() => setDataSelecionada(data)}>
                          {data}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="horarios-section">
                    <h3><FaRegClock /> Horário</h3>
                    <div className="horarios-grid">
                      {horarios.map((horario) => (
                        <div key={horario} className={`horario-card ${horarioSelecionado === horario ? 'selecionado' : ''}`} onClick={() => setHorarioSelecionado(horario)}>
                          {horario}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONFIRMAÇÃO */}
              {((tipoLavagem === "simples" && passo === 4) || (tipoLavagem === "completa" && passo === 5)) && (
                <div className="passo-content">
                  <h2>Confirme seu agendamento</h2>
                  <div className="confirmacao-card">
                    <div className="confirmacao-item"><span>Tipo:</span><strong>{tipoLavagem === "simples" ? "Lavagem Simples" : "Lavagem Completa"}</strong></div>
                    <div className="confirmacao-item"><span>Lavadora:</span><strong>{maquinaSelecionada?.nome}</strong></div>
                    {tipoLavagem === "completa" && <div className="confirmacao-item"><span>Secadora:</span><strong>{secadoraSelecionada?.nome}</strong></div>}
                    <div className="confirmacao-item"><span>Data:</span><strong>{dataSelecionada}</strong></div>
                    <div className="confirmacao-item"><span>Horário:</span><strong>{horarioSelecionado}</strong></div>
                    <div className="confirmacao-item total"><span>Total:</span><strong>R$ {precoTotal.toFixed(2)}</strong></div>
                  </div>
                </div>
              )}

              <div className="botoes-agendamento">
                {passo > 1 && <button className="btn-voltar" onClick={voltarPasso}><FaArrowLeft /> Voltar</button>}
                <button className="btn-cancelar" onClick={voltarParaHome}>Cancelar</button>
                {((tipoLavagem === "simples" && passo < 4) || (tipoLavagem === "completa" && passo < 5)) ? (
                  <button className="btn-proximo" onClick={proximoPasso}>Próximo →</button>
                ) : (
                  <button className="btn-confirmar" onClick={confirmarAgendamento}><FaShoppingCart /> Adicionar ao Carrinho</button>
                )}
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
              {/* CARD DE AGENDAMENTO */}
              <section className="card-destaque-vertical" onClick={() => setMostrarAgendamento(true)}>
                <FaCalendarAlt className="icon-main" />
                <section className="info">
                  <h5>Agendamento</h5>
                  <p>Reserve sua máquina agora mesmo</p>
                </section>
              </section>

              {/* CARD DE HISTÓRICO (REDIRECIONA PARA VER AGENDAMENTOS) */}
              <section className="sub-grid-services">
                <section className="card-mini purple" onClick={() => {
                  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
                  if (agendamentos.length === 0) {
                    alert("Você ainda não tem agendamentos!");
                  } else {
                    alert(`📋 Seus agendamentos:\n${agendamentos.map(a => `${a.nome} - ${a.data} ${a.horario} - R$ ${a.preco}`).join('\n')}`);
                  }
                }}>
                  <FaHistory />
                  <div className="info">
                    <h5>Histórico</h5>
                    <p>Seus agendamentos</p>
                  </div>
                </section>

                <section className="card-mini cyan">
                  <FaCreditCard />
                  <div className="info">
                    <h5>Pagamentos</h5>
                    <p>Faturas e recibos</p>
                  </div>
                </section>

                <section className="card-mini purple">
                  <FaClock />
                  <div className="info">
                    <h5>Status</h5>
                    <p>Acompanhe sua lavagem</p>
                  </div>
                </section>

                <section className="card-mini cyan">
                  <FaBullhorn />
                  <div className="info">
                    <h5>Novidades</h5>
                    <p>Confira as ofertas</p>
                  </div>
                </section>

                <section className="card-mini purple" onClick={() => window.open('https://wa.me/5587992433763', '_blank')}>
                  <FaWhatsapp />
                  <div className="info">
                    <h5>Suporte</h5>
                    <p>Fale conosco</p>
                  </div>
                </section>

                <section className="card-mini cyan" onClick={() => window.open('https://www.instagram.com/lavamais_sertania/', '_blank')}>
                  <FaInstagram />
                  <div className="info">
                    <h5>Siga-nos</h5>
                    <p>No Instagram</p>
                  </div>
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
            <div className="carrinho-header">
              <h2>Seu Carrinho</h2>
              <button className="btn-fechar" onClick={() => setCarrinhoAberto(false)}>✕</button>
            </div>

            {itensCarrinho.length === 0 ? (
              <div className="carrinho-vazio">
                <p>Seu carrinho está vazio</p>
                <button className="btn-continuar" onClick={() => setCarrinhoAberto(false)}>Continuar comprando</button>
              </div>
            ) : (
              <>
                <div className="carrinho-itens">
                  {itensCarrinho.map((item, index) => (
                    <div key={index} className="carrinho-item">
                      <div className="item-info">
                        <h4>{item.nome}</h4>
                        <p>{item.descricao}</p>
                        {item.data && <p className="item-data">📅 {item.data} - ⏰ {item.horario}</p>}
                        {item.maquina && <p className="item-maquina">🧺 {item.maquina}</p>}
                        <span className="item-preco">R$ {item.preco.toFixed(2)}</span>
                      </div>
                      <div className="item-actions">
                        <div className="quantidade-control">
                          <button onClick={() => atualizarQuantidade(index, item.quantidade - 1)}>-</button>
                          <span>{item.quantidade}</span>
                          <button onClick={() => atualizarQuantidade(index, item.quantidade + 1)}>+</button>
                        </div>
                        <button className="btn-remover" onClick={() => removerItem(index)}>
                          <FaTrash /> Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="carrinho-footer">
                  <div className="resumo-pedido">
                    <span>Total do pedido</span>
                    <div className="total">
                      <strong>R$ {totalCarrinho.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="carrinho-botoes">
                    <button className="btn-limpar" onClick={limparCarrinho}>Limpar Carrinho</button>
                    <button className="btn-finalizar" onClick={finalizarPedido}>
                      <FaWhatsapp /> Finalizar Pedido
                    </button>
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