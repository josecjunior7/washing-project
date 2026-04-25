import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
// ATUALIZADO PARA OS NOVOS NOMES
import statusImage from "../../../assets/images/status_da_lavagem.png";
import botaoRecebido from "../../../assets/images/btn_rich.png";
import botaoPreparando from "../../../assets/images/btn_preparando.png";
import botaoPronto from "../../../assets/images/retire.png";
import './Status.css';

function Status() {
  const navigate = useNavigate();
  
  const [statusAtual, setStatusAtual] = useState(2);

  const handleRecebidoClick = () => {
    setStatusAtual(1);
    alert("Status alterado para: RECEBIDO");
  };

  const handlePreparandoClick = () => {
    setStatusAtual(2);
    alert("Status alterado para: PREPARANDO");
  };

  const handleProntoClick = () => {
    setStatusAtual(3);
    alert("Status alterado para: PRONTO PARA RETIRADA");
  };

  return (
    <div className="status-container">
      
      {/* Botão Voltar */}
      <button className="btn-voltar" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar
      </button>

      {/* Imagem do Figma (layout completo) */}
      <img 
        src={statusImage} 
        alt="Status da Lavagem" 
        className="status-image" 
      />

      {/* Botão RECEBIDO */}
      <button 
        className="botao-imagem botao-recebido"
        onClick={handleRecebidoClick}
      >
        <img 
          src={botaoRecebido} 
          alt="Recebido" 
          className="botao-img"
        />
      </button>

      {/* Botão PREPARANDO */}
      <button 
        className="botao-imagem botao-preparando"
        onClick={handlePreparandoClick}
      >
        <img 
          src={botaoPreparando} 
          alt="Preparando" 
          className="botao-img"
        />
      </button>

      {/* Botão PRONTO PARA RETIRADA */}
      <button 
        className="botao-imagem botao-pronto"
        onClick={handleProntoClick}
      >
        <img 
          src={botaoPronto} 
          alt="Pronto para Retirada" 
          className="botao-img"
        />
      </button>

    </div>
  );
}

export default Status;