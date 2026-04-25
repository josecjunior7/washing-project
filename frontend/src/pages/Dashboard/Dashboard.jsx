import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaCreditCard, FaClock, FaBars, FaBullhorn, FaWhatsapp, FaInstagram } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setNomeUsuario(user.nome || "Cliente");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <section className="dashboard-layout">
      <Sidebar 
        aberta={sidebarAberta} 
        setAberta={setSidebarAberta} 
        navigate={navigate} 
        handleLogout={handleLogout} 
      />

      <main className="main-content">
        <header className="header-dashboard">
          <section className="header-left">
            <button className="btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
            <section className="welcome-text">
              <span>Bem-vindo de volta,</span>
              <h2 className="user">{nomeUsuario}</h2>
            </section>
          </section>
          <section className="avatar-circle">{nomeUsuario.charAt(0)}</section>
        </header>

        <section className="dashboard-body">
          <section className="section-area">
            <h4>Nossos Serviços</h4>
            
            <section className="unified-grid">
              {/* AGENDAMENTO */}
              <section className="card-destaque-vertical" onClick={() => navigate('/agendamento')}>
                <FaCalendarAlt className="icon-main" />
                <section className="info">
                  <h5>Agendamento</h5>
                  <p>Reserve sua máquina agora mesmo</p>
                </section>
              </section>

              <section className="sub-grid-services">
                {/* PRIMEIRA FILEIRA DA GRADE */}

                {/* HISTORICO */}
                <section className="card-mini purple">
                  <FaHistory /> 
                  <section className="info">
                    <h5>Histórico</h5>
                    <p>Seus agendamentos</p>
                  </section>
                </section>

                {/* PAGAMENTOS */}
                <section className="card-mini cyan">
                  <FaCreditCard /> 
                  <section className="info">
                    <h5>Pagamentos</h5>
                    <p>Faturas e recibos</p>
                  </section>
                </section>

                {/* STATUS */}
                <section className="card-mini purple">
                  <FaClock /> 
                  <section className="info">
                    <h5>Status</h5>
                    <p>Acompanhe sua lavagem</p>
                  </section>
                </section>

                {/* SEGUNDA FILEIRA DA GRADE */}

                {/* NOVIDADES */}
                <section className="card-mini cyan" onClick={() => navigate('/novidades')}>
                  <FaBullhorn /> 
                  <section className="info">
                    <h5>Novidades</h5>
                    <p>Confira as ofertas</p>
                  </section>
                </section>

                {/* WHATSAPP */}
                <section className="card-mini purple">
                  <FaWhatsapp /> 
                  <section className="info">
                    <h5>Suporte</h5>
                    <p>Fale conosco</p>
                  </section>
                </section>

                {/* INSTAGRAM */}
                <section className="card-mini cyan">
                  <FaInstagram /> 
                  <section className="info">
                    <h5>Siga-nos</h5>
                    <p>No Instagram</p>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </main>
    </section>
  );
}

export default Dashboard;