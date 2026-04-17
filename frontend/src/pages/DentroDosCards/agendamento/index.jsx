import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Agendamento() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>
      <h1>📅 Agendamento</h1>
      <p>Conteúdo da página de agendamento...</p>
    </div>
  );
}

export default Agendamento;