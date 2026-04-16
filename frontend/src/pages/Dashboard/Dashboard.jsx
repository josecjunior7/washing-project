import React from "react";
import { 
  FaCalendarAlt, 
  FaHistory, 
  FaCreditCard, 
  FaBullhorn, 
  FaHeadset, 
  FaClock, 
  FaPlus, 
  FaDollarSign 
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // Definição dos cards da grade direita
  const menuItems = [
    { id: "agendamento", nome: "AGENDAMENTO", icone: <FaCalendarAlt size={50} />, classe: "card-agendamento" },
    { id: "historico_agendamento", nome: "HISTORICO DE AGENDAMENTO", icone: <FaHistory size={50} />, classe: "card-hist-agendamento" },
    { id: "historico_pagamento", nome: "HISTORICO DE PAGAMENTO", icone: <FaClock size={50} />, classe: "card-hist-pagamento" },
    { id: "pagamento", nome: "PAGAMENTO", icone: <FaDollarSign size={50} />, classe: "card-pagamento" },
    { id: "suporte", nome: "SUPORTE", icone: <FaCreditCard size={50} />, classe: "card-suporte" },
    { id: "funcionamento", nome: "FUNCIONAMENTO", icone: <FaHeadset size={50} />, classe: "card-funcionamento" },
  ];

  return (
    <div className="dashboard-container">
      
      {/* CABEÇALHO ROXO SUPERIOR */}
      <header className="header-topo">
        <div className="breadcrumb">
          <span>▶ /page</span>
        </div>
        <div className="voltar-inicio-btn" onClick={() => navigate('/')}>
          voltar ao início
        </div>
      </header>

      <main className="layout-grid">
        
        {/* COLUNA DA ESQUERDA: LOGO E NOVIDADES */}
        <div className="coluna-esquerda">
          <div className="logo-area-nova">
            <div className="logo-texto">
              <h2 className="logo-primario">Lava mais</h2>
              <p className="logo-subtitulo">Lavanderia Autosserviço</p>
            </div>
          </div>

          {/* CARD NOVIDADES (ESTILO VERTICAL) */}
          <div className="card-novidades" onClick={() => navigate('/novidades')}>
            <div className="icone-plus-circle"><FaPlus size={10} /></div>
            <div className="icone-principal">
              <FaBullhorn size={70} />
            </div>
            <h2 className="nome-card">NOVIDADES</h2>
          </div>
        </div>

        {/* COLUNA DA DIREITA: GRADE DE BOTÕES */}
        <div className="grade-botoes">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className={`menu-card ${item.classe}`}
              onClick={() => navigate(`/${item.id}`)}
            >
              <div className="icone-plus-circle"><FaPlus size={10} /></div>
              <div className="icone-principal">
                {item.icone}
              </div>
              <p className="nome-card">{item.nome}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default Dashboard;