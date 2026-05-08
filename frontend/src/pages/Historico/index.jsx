import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHistory, FaCalendarDay, FaRegClock, FaTshirt, FaMoneyBill, FaBars, FaCheckCircle, FaTimes } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Historico.css";

function Historico() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) {
      setNomeUsuario(user.nome);
    }
    
    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    setAgendamentos(agendamentosSalvos);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const cancelarAgendamento = (id) => {
    const novosAgendamentos = agendamentos.filter(item => item.id !== id);
    setAgendamentos(novosAgendamentos);
    localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
    alert("Agendamento cancelado com sucesso!");
  };

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
            <button className="btn-voltar-historico" onClick={() => navigate('/home')}>
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
          <div className="historico-container">
            <div className="historico-header">
              <h2><FaHistory /> Meu Histórico</h2>
              <p>Seus agendamentos realizados</p>
            </div>

            {agendamentos.length === 0 ? (
              <div className="historico-vazio">
                <FaHistory className="icone-vazio" />
                <p>Você ainda não tem agendamentos</p>
                <button className="btn-agendar" onClick={() => navigate('/agendamento')}>
                  Fazer primeiro agendamento
                </button>
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
                        <p>Agendado em: {item.dataCriacao}</p>
                      </div>
                      <button className="btn-cancelar" onClick={() => cancelarAgendamento(item.id)}>
                        <FaTimes /> Cancelar
                      </button>
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

export default Historico;