import React from "react";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import dashboardLogo from "./../../assets/images/dashboard-logo.png";
import "./Dashboard.css";

// IMPORTANDO AS IMAGENS
import NOVIDADES from "./../../assets/images/NOVIDADES.png";
import STATUS from "./../../assets/images/STATUS.png";
import AGENDAMENTO from "./../../assets/images/AGENDAMENTO.png";
import PAGAMENTO from "./../../assets/images/PAGAMENTO.png";
import HISTORICO_DE_AGENDAMENTO from "./../../assets/images/HISTORICO DE AGENDAMENTO.png";
import HISTORICO_DE_PAGAMENTO from "./../../assets/images/HISTORICO DE PAGAMENTO.png";
import SUPORTE from "./../../assets/images/SUPORTE.png";

function Dashboard() {
  const navigate = useNavigate();

  // FUNÇÕES DE NAVEGAÇÃO
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
          <button className="btn-figma" onClick={irParaNovidades}>
            <img src={NOVIDADES} alt="NOVIDADES" />
          </button>
        </div>

        {/* COLUNA DIREITA - BOTÕES COM IMAGENS */}
        <div className="grade-figma">
          
          {/* AGENDAMENTO */}
          <button className="btn-figma" onClick={irParaAgendamento}>
            <img src={AGENDAMENTO} alt="AGENDAMENTO" />
          </button>

          {/* HISTORICO DE AGENDAMENTO */}
          <button className="btn-figma" onClick={irParaHistoricoAgendamento}>
            <img src={HISTORICO_DE_AGENDAMENTO} alt="HISTORICO DE AGENDAMENTO" />
          </button>

          {/* HISTORICO DE PAGAMENTO */}
          <button className="btn-figma" onClick={irParaHistoricoPagamento}>
            <img src={HISTORICO_DE_PAGAMENTO} alt="HISTORICO DE PAGAMENTO" />
          </button>

          {/* PAGAMENTO */}
          <button className="btn-figma" onClick={irParaPagamento}>
            <img src={PAGAMENTO} alt="PAGAMENTO" />
          </button>

          {/* SUPORTE */}
          <button className="btn-figma" onClick={irParaSuporte}>
            <img src={SUPORTE} alt="SUPORTE" />
          </button>

          {/* FUNCIONAMENTO */}
          <button className="btn-figma" onClick={irParaFuncionamento}>
            <img src={STATUS} alt="STATUS" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;