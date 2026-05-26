import React from "react";
import { FaHome, FaUser, FaSignOutAlt, FaTimes } from "react-icons/fa";
import dashboardLogo from "../../assets/images/dashboard-logo.png";
import "./Sidebar.css";

const Sidebar = ({ aberta, setAberta, navigate, handleLogout }) => {
  return (
    <>
      {/* Overlay para fechar no mobile ao clicar fora */}
      {aberta && <div className="sidebar-overlay" onClick={() => setAberta(false)}></div>}
      
      <aside className={`sidebar-component ${aberta ? "aberta" : ""}`}>
        <div className="sidebar-header">
          <img src={dashboardLogo} alt="Logo" className="sidebar-logo" />
          <button className="btn-fechar-menu" onClick={() => setAberta(false)}>
            <FaTimes />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active" onClick={() => navigate('/home')}>
            <FaHome /> <span>Início</span>
          </div>
          
          <div className="nav-item nav-perfil" onClick={() => navigate('/perfil')}>
            <FaUser /> <span>Meu Perfil</span>
          </div>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Sair da conta
        </button>
      </aside>
    </>
  );
};

export default Sidebar;