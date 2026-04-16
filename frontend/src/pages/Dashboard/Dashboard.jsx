import React from "react";
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, FaHistory, FaCreditCard, 
  FaHeadset, FaCogs, FaNewspaper, FaArrowLeft
} from 'react-icons/fa';
import dashboardLogo from "./../../assets/images/dashboard-logo.png";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const irParaAgendamento = () => navigate('/agendamento');
  const irParaHistoricoAgendamento = () => navigate('/historico-agendamento');
  const irParaHistoricoPagamento = () => navigate('/historico-pagamento');
  const irParaPagamento = () => navigate('/pagamento');
  const irParaSuporte = () => navigate('/suporte');
  const irParaFuncionamento = () => navigate('/funcionamento');
  const irParaNovidades = () => navigate('/novidades');

  return (
    <div className="dashboard-container">
      
      {/* CABEÇALHO SUPERIOR */}
      <div className="header-topo">
        <div className="breadcrumb">
          Página Inicial / Dashboard
        </div>
        <button className="voltar-inicio-btn" onClick={() => navigate('/')}>
          <FaArrowLeft /> voltar ao início
        </button>
      </div>

      {/* LAYOUT PRINCIPAL */}
      <div className="layout-grid">
        
        {/* COLUNA ESQUERDA */}
        <div className="coluna-esquerda">
          
          {/* LOGO */}
          <div className="logo-area">
  <img src={dashboardLogo} alt="Logo Dashboard" className="logo-imagem" />
</div>
          
          {/* CARD NOVIDADES */}
          <div className="card-novidades" onClick={irParaNovidades}>
            <FaNewspaper className="icone-card" />
            <div className="nome-card">NOVIDADES</div>
            <div className="icone-plus-circle">+</div>
          </div>
        </div>

        {/* COLUNA DIREITA - GRADE DE BOTÕES */}
        <div className="grade-botoes">
          
          <div className="menu-card card-agendamento" onClick={irParaAgendamento}>
            <FaCalendarAlt className="icone-card" />
            <div className="nome-card">AGENDAMENTO</div>
            <div className="icone-plus-circle">+</div>
          </div>

          <div className="menu-card card-hist-agendamento" onClick={irParaHistoricoAgendamento}>
            <FaHistory className="icone-card" />
            <div className="nome-card">HISTORICO DE<br />AGENDAMENTO</div>
            <div className="icone-plus-circle">+</div>
          </div>

          <div className="menu-card card-hist-pagamento" onClick={irParaHistoricoPagamento}>
            <FaCreditCard className="icone-card" />
            <div className="nome-card">HISTORICO DE<br />PAGAMENTO</div>
            <div className="icone-plus-circle">+</div>
          </div>

          <div className="menu-card card-pagamento" onClick={irParaPagamento}>
            <FaCreditCard className="icone-card" />
            <div className="nome-card">PAGAMENTO</div>
            <div className="icone-plus-circle">+</div>
          </div>

          <div className="menu-card card-suporte" onClick={irParaSuporte}>
            <FaHeadset className="icone-card" />
            <div className="nome-card">SUPORTE</div>
            <div className="icone-plus-circle">+</div>
          </div>

          <div className="menu-card card-funcionamento" onClick={irParaFuncionamento}>
            <FaCogs className="icone-card" />
            <div className="nome-card">FUNCIONAMENTO</div>
            <div className="icone-plus-circle">+</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;