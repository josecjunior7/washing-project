import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaRegCircle, FaTshirt, FaWind, FaWater, FaRegClock, FaCalendarDay, FaShoppingCart } from "react-icons/fa";
import "./Agendamento.css";

function Agendamento() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(1);
  const [tipoServico, setTipoServico] = useState("");
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [precoTotal, setPrecoTotal] = useState(0);

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

  const adicionarAoCarrinho = (servico) => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoSalvo.push({ ...servico, quantidade: 1, id: Date.now() });
    localStorage.setItem('carrinho', JSON.stringify(carrinhoSalvo));
    alert(`Serviço adicionado ao carrinho!`);
    navigate('/carrinho');
  };

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
      nome: nomeServico,
      descricao: descricaoServico,
      maquina: maquinaSelecionada.nome,
      data: dataSelecionada,
      horario: horarioSelecionado,
      preco: preco
    };
    adicionarAoCarrinho(novoServico);
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

  return (
    <section className="home-layout">
      <main className="main-content">
        <header className="header-home">
          <section className="header-left">
            <button className="btn-voltar-agendamento" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Voltar
            </button>
            <section className="welcome-text">
              <span>Bem-vindo de volta,</span>
              <h2 className="user">Cliente</h2>
            </section>
          </section>
          <section className="avatar-circle">C</section>
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

            {/* PASSO 1 - ESCOLHER TIPO DE SERVIÇO */}
            {passo === 1 && (
              <div className="passo-content">
                <h2>Escolha o tipo de serviço</h2>
                <div className="tipos-grid">
                  <div className="tipo-card" onClick={() => selecionarTipoServico("lavagem")}>
                    <FaWater className="tipo-icon" />
                    <h3>Lavagem</h3>
                    <p>Lavagem + Atendimento</p>
                    <strong>R$ 30,00</strong>
                  </div>
                  <div className="tipo-card" onClick={() => selecionarTipoServico("secagem")}>
                    <FaWind className="tipo-icon" />
                    <h3>Secagem</h3>
                    <p>Secagem + Atendimento</p>
                    <strong>R$ 20,00</strong>
                  </div>
                </div>
              </div>
            )}

            {/* PASSO 2 - ESCOLHER MÁQUINA */}
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

            {/* PASSO 3 - DATA E HORÁRIO */}
            {passo === 3 && (
              <div className="passo-content">
                <h2>Escolha data e horário</h2>
                <div className="datas-section">
                  <h3>Data</h3>
                  <div className="datas-grid">
                    {datasDisponiveis.map((data, idx) => (
                      <div key={idx} className={`data-card ${dataSelecionada === data ? 'selecionada' : ''}`} onClick={() => setDataSelecionada(data)}>
                        {data}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="horarios-section">
                  <h3>Horário</h3>
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

            {/* PASSO 4 - CONFIRMAÇÃO */}
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
              <button className="btn-cancelar" onClick={() => navigate('/home')}>Cancelar</button>
              {passo < 4 ? (
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

export default Agendamento;