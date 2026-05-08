import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaCreditCard, FaClock, FaBars, FaBullhorn, FaWhatsapp, FaInstagram, FaShoppingCart } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [itensCarrinho, setItensCarrinho] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) {
      setNomeUsuario(user.nome);
    }
    
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItensCarrinho(carrinhoSalvo);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const totalItensCarrinho = itensCarrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);

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
            <section className="welcome-text">
              <span>Bem-vindo de volta,</span>
              <h2 className="user">{nomeUsuario}</h2>
            </section>
          </section>
          <section className="header-right">
            <button className="btn-carrinho" onClick={() => navigate('/carrinho')}>
              <FaShoppingCart />
              {totalItensCarrinho > 0 && <span className="carrinho-badge">{totalItensCarrinho}</span>}
            </button>
            <section className="avatar-circle">
              {nomeUsuario ? nomeUsuario.charAt(0) : "C"}
            </section>
          </section>
        </header>

        <section className="home-body">
          <section className="section-area">
            <h4>NOSSOS SERVIÇOS</h4>
            
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
                {/* HISTORICO */}
                <section className="card-mini purple" onClick={() => navigate('/historico')}>
                  <FaHistory /> 
                  <section className="info">
                    <h5>Histórico</h5>
                    <p>Seus agendamentos</p>
                  </section>
                </section>

                {/* PAGAMENTOS */}
                <section className="card-mini cyan" onClick={() => navigate('/pagamentos')}>
                  <FaCreditCard /> 
                  <section className="info">
                    <h5>Pagamentos</h5>
                    <p>Faturas e recibos</p>
                  </section>
                </section>

                {/* STATUS */}
                <section className="card-mini purple" onClick={() => navigate('/status')}>
                  <FaClock /> 
                  <section className="info">
                    <h5>Status</h5>
                    <p>Acompanhe sua lavagem</p>
                  </section>
                </section>

                {/* NOVIDADES */}
                <section className="card-mini cyan" onClick={() => navigate('#')}>
                  <FaBullhorn /> 
                  <section className="info">
                    <h5>Novidades</h5>
                    <p>Confira as ofertas</p>
                  </section>
                </section>

                {/* WHATSAPP */}
                <section className="card-mini purple" onClick={() => window.open('https://wa.me/5587992433763', '_blank')}>
                  <FaWhatsapp /> 
                  <section className="info">
                    <h5>Suporte</h5>
                    <p>Fale conosco</p>
                  </section>
                </section>

                {/* INSTAGRAM */}
                <section className="card-mini cyan" onClick={() => window.open('https://www.instagram.com/lavamais_sertania/', '_blank')}>
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

export default Home;