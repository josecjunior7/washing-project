import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const copiarEndereco = () => {
    const endereco = "Av. Norte Miguel Arraes de Alencar, 5050 - Recife, PE";
    navigator.clipboard.writeText(endereco);
    alert("Endereço copiado!");
  };

  const abrirMaps = (endereco) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="home-empresa-container">
      {/* FAIXA AZUL NO TOPO */}
      <div className="top-bar">
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        
        <div className="nav-menu">
          <a href="#">Quem somos</a>
          <a href="#">Conheça nossas lavanderias</a>
          <a href="#">Encontre uma loja</a>
          <a href="#">Entre em contato</a>
        </div>
        
        {/* BOTÃO LOGIN */}
        <button className="btn-login-top" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>

      {/* 3 PONTINHOS */}
      {menuAberto && (
  <div className="menu-lateral" onMouseLeave={fecharMenu}>
    <div className="menu-item" onClick={() => navigate('/faq')}>
      ❓ Dúvidas Frequentes
    </div>
    <div className="menu-item" onClick={() => navigate('/politica-privacidade')}>
      🔒 Política de Privacidade
    </div>
    <div className="menu-item" onClick={() => navigate('/termos')}>
      📜 Termos de Uso
    </div>
  </div>
)}

      {/* CONTEÚDO PRINCIPAL (restante do código igual) */} {/*parte do titulo */}
      <div className="content">
        {/* LOGO CENTRALIZADO */}
        <div className="logo-section">
          <div className="logo-container">
            <span className="logo-text-left">LAVA</span>
            <div className="logo-img">
              <span className="logo-emoji">🧼</span>
            </div>
            <span className="logo-text-right">MAIS</span>
          </div>
          <div className="logo-subtitle">
            LAVANDERIA AUTO SERVIÇO
          </div>
        </div>

        {/* CARD DA UNIDADE PRINCIPAL */} {/* informações que vão aparecer no site sobre empresa*/}
        <div className="card-unidade">
          <h1>LAVA MAIS LAVANDERIA AUTO SERVIÇOS, Recife Av. Norte</h1>
          
          <div className="info-unidade">
            <div className="info-item">
              <span className="emoji">📍</span>
              <strong>Endereço:</strong>
              <span>Av. Norte Miguel Arraes de Alencar, 5050 - 52210000, Recife, PE</span>
            </div>
            
            <div className="info-item">
              <span className="emoji">📞</span>
              <strong>Contato:</strong>
              <span>(81) 99314-5702</span>
            </div>
            
            <div className="info-item">
              <span className="emoji">📧</span>
              <strong>E-mail:</strong>
              <span>lavanderia.anonima.autoserviço@gmail.com</span>
            </div>
            
            <div className="info-item">
              <span className="emoji">🕒</span>
              <strong>Horários:</strong>
              <span>Segunda a Domingo: Aberto 24 horas</span>
            </div>
          </div>
          
          <div className="botoes-acao">
            <button className="btn-acao" onClick={copiarEndereco}>
              📋 Cópia
            </button>
            <button className="btn-acao" onClick={() => abrirMaps("Av. Norte Miguel Arraes de Alencar, 5050 Recife")}>
              🗺️ Como chegar
            </button>
            <button className="btn-acao" onClick={() => abrirMaps("Av. Norte Miguel Arraes de Alencar, 5050 Recife")}>
              🌍 Abrir no Maps
            </button>
          </div>
        </div>


           {/* GRADE DA UNIDADE */}
        <div className="grid-unidades">
          <div className="card-unidade-secundaria">
            <h3>Mercado Público</h3>
            <p>📍 Mercado Público de Casa Amarela</p>
            <div className="endereco">
              Rua Padre Lemos, 500 - Casa Amarela, Recife - PE
            </div>
            <button className="btn-mapa" onClick={() => abrirMaps("Mercado Público de Casa Amarela, Recife")}>
              Ver no Mapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;