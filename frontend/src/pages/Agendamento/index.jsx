import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCheckCircle, FaTshirt, FaWind, FaWater, FaShoppingCart, FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Agendamento.css";

function Agendamento() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [passo, setPasso] = useState(1);
  const [tipoServico, setTipoServico] = useState("");
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [precoTotal, setPrecoTotal] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const [lavadoras] = useState([
    { id: "L1", nome: "Lavadora 1", disponivel: true, ocupada: false },
    { id: "L2", nome: "Lavadora 2", disponivel: true, ocupada: false },
  ]);

  const [secadoras] = useState([
    { id: "S1", nome: "Secadora 1", disponivel: true, ocupada: false },
    { id: "S2", nome: "Secadora 2", disponivel: true, ocupada: false },
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeUsuario(user.nome);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
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
    if (passo === 2 && !maquinaSelecionada) { alert("Selecione uma máquina!"); return; }
    if (passo === 3 && (!dataSelecionada || !horarioSelecionado)) { alert("Selecione data e horário!"); return; }
    setPasso(passo + 1);
  };

  const voltarPasso = () => { if (passo > 1) setPasso(passo - 1); };

  const confirmarAgendamento = async () => {
    const user = JSON.parse(localStorage.getItem('usuario'));

    if (!user || !user.id) {
      alert("Usuário não encontrado. Faça login novamente.");
      navigate('/login');
      return;
    }

    setCarregando(true);

    const novoAgendamento = {
      nomeCliente: user.nome,
      servico: tipoServico === "lavagem" ? "Lavagem" : "Secagem",
      maquina: maquinaSelecionada.nome,
      data: dataSelecionada,
      horario: horarioSelecionado,
      valor: precoTotal,
      usuarioId: user.id,
    };

    try {
      await axios.post('http://localhost:8080/api/agendamentos', novoAgendamento);
      alert("Agendamento realizado com sucesso!");
      navigate('/home');
    } catch (error) {
      alert("Erro ao realizar agendamento. Tente novamente!");
    } finally {
      setCarregando(false);
    }
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
      <Sidebar
        aberta={sidebarAberta}
        setAberta={setSidebarAberta}
        navigate={navigate}
        handleLogout={handleLogout}
      />

      <main className="main-content">
        <header className="header-home">
          <section className="header-left">
            <button className="btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
            <button className="btn-voltar-agendamento" onClick={() => navigate('/home')}>
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
          <div className="agendamento-wrapper">
            <div className="agendamento-card">
              <div className="agendamento-title">
                <h2>Novo Agendamento</h2>
                <p>Preencha os dados abaixo para reservar sua máquina</p>
              </div>

              <div className="step-indicator">
                {[1,2,3,4].map((n, i) => (
                  <React.Fragment key={n}>
                    <div className={`step ${passo >= n ? 'active' : ''}`}>
                      <span className="step-num">{n}</span>
                      <span className="step-label">{["Serviço","Máquina","Data/Hora","Confirmar"][i]}</span>
                    </div>
                    {i < 3 && <div className={`step-line ${passo >= n+1 ? 'active' : ''}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              {/* PASSO 1 — Serviço */}
              {passo === 1 && (
                <div className="passo-content">
                  <div className="servicos-grid">
                    <div className={`servico-card ${tipoServico === "lavagem" ? 'selected' : ''}`} onClick={() => selecionarTipoServico("lavagem")}>
                      <FaWater className="servico-icon" />
                      <h3>Lavagem</h3>
                      <p>Lavagem + Atendimento</p>
                      <div className="servico-preco">R$ 30,00</div>
                    </div>
                    <div className={`servico-card ${tipoServico === "secagem" ? 'selected' : ''}`} onClick={() => selecionarTipoServico("secagem")}>
                      <FaWind className="servico-icon" />
                      <h3>Secagem</h3>
                      <p>Secagem + Atendimento</p>
                      <div className="servico-preco">R$ 20,00</div>
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 2 — Máquina */}
              {passo === 2 && (
                <div className="passo-content">
                  <h3 className="passo-subtitle">{tipoServico === "lavagem" ? "Escolha a lavadora" : "Escolha a secadora"}</h3>
                  <div className="maquinas-grid">
                    {(tipoServico === "lavagem" ? lavadoras : secadoras).map((maq) => (
                      <div
                        key={maq.id}
                        className={`maquina-card ${!maq.disponivel || maq.ocupada ? 'indisponivel' : ''} ${maquinaSelecionada?.id === maq.id ? 'selecionada' : ''}`}
                        onClick={() => selecionarMaquina(maq)}
                      >
                        <div className="maquina-icon">
                          {tipoServico === "lavagem" ? <FaTshirt /> : <FaWind />}
                        </div>
                        <div className="maquina-info">
                          <span className="maquina-nome">{maq.nome}</span>
                          <span className="maquina-status">
                            {!maq.disponivel || maq.ocupada ? "Indisponível" : "Disponível"}
                          </span>
                        </div>
                        {maquinaSelecionada?.id === maq.id && <FaCheckCircle className="check-icon" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PASSO 3 — Data/Hora */}
              {passo === 3 && (
                <div className="passo-content">
                  <h3 className="passo-subtitle">Escolha data e horário</h3>
                  <div className="datas-section">
                    <label>Data</label>
                    <div className="datas-grid">
                      {datasDisponiveis.map((data, idx) => (
                        <div key={idx} className={`data-card ${dataSelecionada === data ? 'selecionada' : ''}`} onClick={() => setDataSelecionada(data)}>
                          {data}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="horarios-section">
                    <label>Horário</label>
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

              {/* PASSO 4 — Confirmar */}
              {passo === 4 && (
                <div className="passo-content">
                  <h3 className="passo-subtitle">Confirme seus dados</h3>
                  <div className="confirmacao-card">
                    <div className="confirmacao-row">
                      <span>Serviço:</span>
                      <strong>{tipoServico === "lavagem" ? "Lavagem" : "Secagem"}</strong>
                    </div>
                    <div className="confirmacao-row">
                      <span>Máquina:</span>
                      <strong>{maquinaSelecionada?.nome}</strong>
                    </div>
                    <div className="confirmacao-row">
                      <span>Data:</span>
                      <strong>{dataSelecionada}</strong>
                    </div>
                    <div className="confirmacao-row">
                      <span>Horário:</span>
                      <strong>{horarioSelecionado}</strong>
                    </div>
                    <div className="confirmacao-row total">
                      <span>Total:</span>
                      <strong>R$ {precoTotal.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="botoes-agendamento">
                {passo > 1 && (
                  <button className="btn-outline" onClick={voltarPasso}>
                    <FaArrowLeft /> Voltar
                  </button>
                )}
                <button className="btn-outline cancel" onClick={() => navigate('/home')}>
                  Cancelar
                </button>
                {passo < 4 ? (
                  <button className="btn-primary" onClick={proximoPasso}>
                    Próximo →
                  </button>
                ) : (
                  <button className="btn-primary confirm" onClick={confirmarAgendamento} disabled={carregando}>
                    {carregando ? "Agendando..." : <><FaShoppingCart /> Confirmar Agendamento</>}
                  </button>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

export default Agendamento;