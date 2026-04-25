import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
// ATUALIZADO PARA O NOVO NOME
import agendamentoImage from "../../../assets/images/layout_agend.png";
import './Agendamento.css';

function Agendamento() {
  const navigate = useNavigate();

  return (
    <div className="agendamento-container">
      
      {/* Botão Voltar */}
      <button className="btn-voltar" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar
      </button>

      {/* Imagem do Figma (layout completo) */}
      <img 
        src={agendamentoImage} 
        alt="Agendamento" 
        className="agendamento-image" 
      />

    </div>
  );
}

export default Agendamento;