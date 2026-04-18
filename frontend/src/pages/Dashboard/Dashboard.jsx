import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import dashboardLogo from "../../assets/images/dashboard-logo.png";
import "./Dashboard.css";

// IMPORTANDO AS IMAGENS - CAMINHO CORRIGIDO
import NOVIDADES from "../../assets/images/NOVIDADES.png";
import STATUS from "../../assets/images/STATUS.png";
import AGENDAMENTO from "../../assets/images/AGENDAMENTO.png";
import CONTATO from "../../assets/images/CONTATO.png";
import INSTAGRAM from "../../assets/images/INSTAGRAM.png";
import HISTORICO_DE_AGENDAMENTO from "../../assets/images/HISTORICO DE AGENDAMENTO.png";
import HISTORICO_DE_PAGAMENTO from "../../assets/images/HISTORICO DE PAGAMENTO.png";

function Dashboard() {
  const navigate = useNavigate();

  // FUNÇÕES DE NAVEGAÇÃO
  const irParaAgendamento = () => navigate('/agendamento');
  const irParaHistoricoAgendamento = () => navigate('/historico-agendamento');
  const irParaHistoricoPagamento = () => navigate('/historico-pagamento');
  const irParaStatus = () => navigate('/status');
  const irParaContato = () => navigate('/contato');
  const irParaInstagram = () => navigate('/instagram');
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
            <div className="logo-subtitulo">Lavanderia Autoserviço</div>
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

          {/* STATUS */}
          <button className="btn-figma" onClick={irParaStatus}>
            <img src={STATUS} alt="STATUS" />
          </button>

          {/* CONTATO */}
          <button className="btn-figma" onClick={irParaContato}>
            <img src={CONTATO} alt="CONTATO" />
          </button>

          {/* INSTAGRAM */}
          <button className="btn-figma" onClick={irParaInstagram}>
            <img src={INSTAGRAM} alt="INSTAGRAM" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;