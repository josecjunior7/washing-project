import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import HOME from "../../assets/images/HOME.png";
import LOGO from "../../assets/images/LOGO_2_3 1.png";

const Home = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  // Função copiar endereço
  const copiarEndereco = () => {
    const endereco = "Av. Joaquim Nabuco, 209 - Sertânia, PE, 56600-000";
    navigator.clipboard.writeText(endereco);
    alert("Endereço copiado!");
  };

  // Função abrir WhatsApp
  const abrirWhatsApp = () => {
    window.open("https://wa.me/5587992433763", "_blank");
  };

  return (
    <div className="home-container">
      
      {/* IMAGEM DE FUNDO (LAYOUT DO FIGMA) */}
      <img 
        src={HOME} 
        alt="Home Layout" 
        className="home-bg-image" 
      />

      {/* LOGO NO CANTO SUPERIOR ESQUERDO */}
      <img 
        src={LOGO} 
        alt="Logo" 
        className="logo-superior-esquerdo" 
      />

      {/* TOP BAR SOBREPOSTA */}
      <div className="top-bar-overlay">
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <button className="btn-login-top" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>

      {/* MENU LATERAL */}
      {menuAberto && (
        <div className="menu-lateral" onMouseLeave={fecharMenu}>
          <div className="menu-item">❓ Dúvidas Frequentes</div>
          <div className="menu-item">🔒 Política de Privacidade</div>
          <div className="menu-item">📜 Termos de Uso</div>
        </div>
      )}

      {/* INFORMAÇÕES À DIREITA */}
      <div className="info-panel">
        
        {/* LOCALIZAÇÃO */}
        <div className="info-card">
          <h3>📍 Localização</h3>
          <p>Av. Joaquim Nabuco, 209 - Sertânia, PE, 56600-000</p>
          <button className="btn-copiar" onClick={copiarEndereco}>
            📋 Copiar endereço
          </button>
        </div>

        {/* MAPA */}
        <div className="info-card">
          <h3>🗺️ Mapa do local</h3>
          <iframe
            title="Mapa Lavamais"
            src="https://www.google.com/maps?q=Av.+Joaquim+Nabuco,+209,+Sertânia,+PE&output=embed"
            className="mapa-iframe"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* HORÁRIO DE FUNCIONAMENTO */}
        <div className="info-card">
          <h3>🕒 Horário de funcionamento</h3>
          <p><strong>6h - 21h</strong> (todos os dias)</p>
          <p className="atendente">👨‍💼 Atendente:</p>
          <p>Segunda - Sexta: 08h - 12h</p>
          <p>Sábado: 08h - 12h</p>
        </div>

      </div>

    </div>
  );
};

export default Home;