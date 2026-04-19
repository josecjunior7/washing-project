import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import dashboardLogo from "../../assets/images/dashboard-logo.png";
import "./Dashboard.css";

// IMPORTANDO AS IMAGENS
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
  const irParaCarrinho = () => navigate('/carrinho');
  
  // FUNÇÃO PARA ABRIR INSTAGRAM - LINK DIRETO
  const abrirInstagram = () => {
    window.open('https://www.instagram.com/lavamais_sertania/', '_blank');
  };
  
  const irParaNovidades = () => navigate('/novidades');

  return (
    <div className="dashboard-container">
      
      {/* CABEÇALHO SUPERIOR */}
      <div className="header-topo">
        <div className="breadcrumb">
          Página Inicial / Dashboard
        </div>
        <div className="header-botoes">
          <button className="btn-carrinho" onClick={irParaCarrinho}>
            <FaShoppingCart /> Carrinho
          </button>
          <button className="voltar-inicio-btn" onClick={() => navigate('/')}>
            <FaArrowLeft /> voltar ao início
          </button>
        </div>
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
          
          <button className="btn-figma" onClick={irParaAgendamento}>
            <img src={AGENDAMENTO} alt="AGENDAMENTO" />
          </button>

          <button className="btn-figma" onClick={irParaHistoricoAgendamento}>
            <img src={HISTORICO_DE_AGENDAMENTO} alt="HISTORICO DE AGENDAMENTO" />
          </button>

          <button className="btn-figma" onClick={irParaHistoricoPagamento}>
            <img src={HISTORICO_DE_PAGAMENTO} alt="HISTORICO DE PAGAMENTO" />
          </button>

          <button className="btn-figma" onClick={irParaStatus}>
            <img src={STATUS} alt="STATUS" />
          </button>

          <button className="btn-figma" onClick={irParaContato}>
            <img src={CONTATO} alt="CONTATO" />
          </button>

          {/* INSTAGRAM - LINK DIRETO */}
          <button className="btn-figma" onClick={abrirInstagram}>
            <img src={INSTAGRAM} alt="INSTAGRAM" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;