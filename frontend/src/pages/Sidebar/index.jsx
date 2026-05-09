import React from "react";
import { FaHome, FaCalendarAlt, FaHistory, FaCreditCard, FaClock, FaBullhorn, FaWhatsapp, FaInstagram, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ aberta, setAberta, navigate, handleLogout }) {
  const menuItems = [
    { icone: <FaHome />, label: "Início", path: "/home" },
    { icone: <FaUser />, label: "Meu Perfil", path: "/perfil" },
    { icone: <FaCalendarAlt />, label: "Agendamento", path: "/agendamento" },
    { icone: <FaHistory />, label: "Histórico", path: "/historico" },
    { icone: <FaCreditCard />, label: "Pagamentos", path: "/pagamentos" },
    { icone: <FaClock />, label: "Status", path: "/status" },
    { icone: <FaBullhorn />, label: "Novidades", path: "/novidades" },
    { icone: <FaWhatsapp />, label: "Suporte", path: "https://wa.me/5587992433763", external: true },
    { icone: <FaInstagram />, label: "Instagram", path: "https://www.instagram.com/lavamais_sertania/", external: true },
  ];

  const handleClick = (item) => {
    if (item.external) {
      window.open(item.path, '_blank');
    } else {
      navigate(item.path);
    }
    setAberta(false);
  };

  return (
    <>
      {aberta && <div className="sidebar-overlay" onClick={() => setAberta(false)}></div>}
      
      <aside className={`sidebar ${aberta ? 'aberta' : ''}`}>
        <div className="sidebar-header">
          <h2>Lava Mais</h2>
          <p>Lavanderia e Secagem</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="sidebar-item"
              onClick={() => handleClick(item)}
            >
              <span className="sidebar-icon">{item.icone}</span>
              <span className="sidebar-label">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-item" onClick={handleLogout}>
            <span className="sidebar-icon"><FaSignOutAlt /></span>
            <span className="sidebar-label">Sair da conta</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;