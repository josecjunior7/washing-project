import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft, FaHistory, FaCalendarDay, FaRegClock,
  FaTshirt, FaMoneyBill, FaBars, FaCheckCircle,
  FaTimes, FaHourglassHalf, FaSpinner
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Historico.css";

const STATUS_INFO = {
  CONCLUIDO:    { label: "Concluído",    classe: "concluido",  icone: <FaCheckCircle />   },
  EM_ANDAMENTO: { label: "Em andamento", classe: "andamento",  icone: <FaSpinner />       },
  AGUARDANDO:   { label: "Aguardando",   classe: "aguardando", icone: <FaHourglassHalf /> },
  CANCELADO:    { label: "Cancelado",    classe: "cancelado",  icone: <FaTimes />         },
};

function Historico() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario,   setNomeUsuario]   = useState("Cliente");
  const [agendamentos,  setAgendamentos]  = useState([]);
  const [carregando,    setCarregando]    = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeUsuario(user.nome);

    if (user && user.id) {
      axios.get(`http://localhost:8080/api/agendamentos/usuario/${user.id}`)
        .then(res => setAgendamentos(res.data))
        .catch(() => alert("Erro ao carregar histórico!"))
        .finally(() => setCarregando(false));
    } else {
      setCarregando(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const cancelarAgendamento = async (id) => {
    if (!window.confirm("Deseja cancelar este agendamento?")) return;
    try {
      await axios.put(`http://localhost:8080/api/agendamentos/${id}/status`, { status: "CANCELADO" });
      setAgendamentos(prev =>
        prev.map(ag => ag.id === id ? { ...ag, status: "CANCELADO" } : ag)
      );
      alert("Agendamento cancelado!");
    } catch {
      alert("Erro ao cancelar agendamento!");
    }
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

            {carregando ? (
              <div className="historico-vazio">
                <p>Carregando...</p>
              </div>
            ) : agendamentos.length === 0 ? (
              <div className="historico-vazio">
                <FaHistory className="icone-vazio" />
                <p>Você ainda não tem agendamentos</p>
                <button className="btn-agendar" onClick={() => navigate('/agendamento')}>
                  Fazer primeiro agendamento
                </button>
              </div>
            ) : (
              <div className="historico-lista">
                {agendamentos.map((item) => {
                  const info = STATUS_INFO[item.status] || STATUS_INFO.AGUARDANDO;
                  return (
                    <div key={item.id} className="historico-card">
                      <div className="historico-card-header">
                        <h3>{item.servico}</h3>
                        <span className={`status-agendado ${info.classe}`}>
                          {info.icone} {info.label}
                        </span>
                      </div>
                      <div className="historico-card-body">
                        <div className="historico-info">
                          <p><FaCalendarDay /> Data: {new Date(item.data).toLocaleDateString('pt-BR')}</p>
                          <p><FaRegClock /> Horário: {item.horario}</p>
                          <p><FaTshirt /> Máquina: {item.maquina}</p>
                          <p><FaMoneyBill /> Valor: R$ {item.valor?.toFixed(2)}</p>
                        </div>
                        {item.status === "AGUARDANDO" && (
                          <button className="btn-cancelar" onClick={() => cancelarAgendamento(item.id)}>
                            <FaTimes /> Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </section>
  );
}

export default Historico;