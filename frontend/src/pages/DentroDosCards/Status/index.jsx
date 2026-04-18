import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import statusImage from "../../../assets/images/STATUS DE LAVAGEM.png";
import botaoPronto from "../../../assets/images/BOTÃO PRONTO PARA RETIRADA.png";
import './Status.css';

function Status() {
  const navigate = useNavigate();
  
  const [statusAtual, setStatusAtual] = useState(2);

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

      {/* Botão usando a imagem exportada do Figma */}
      <button 
        className="botao-imagem"
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