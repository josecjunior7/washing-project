import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderPublic.css";
import logo from "../../assets/images/logo_extend.png"; 

const HeaderPublic = () => {
  const navigate = useNavigate();

  return (
    <header className="header-public">
      <div className="header-content">
        
        {/* LADO ESQUERDO: LOGO */}
        <div className="logo-wrapper" onClick={() => navigate('/')}>
          <img src={logo} alt="Lava Mais" className="header-logo" />
        </div>

        {/* CENTRO/DIREITA: NAVEGAÇÃO */}
        <nav className="header-nav">
          <button className="nav-item" onClick={() => navigate('/')}>Início</button>
          <button className="nav-item" onClick={() => navigate('/login')}>Login</button>
        </nav>

      </div>
    </header>
  );
};

export default HeaderPublic;