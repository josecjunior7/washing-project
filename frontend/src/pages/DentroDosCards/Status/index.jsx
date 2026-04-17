import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Status() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>
      <h1>📊 Status de Lavagem</h1>
      <p>Conteúdo da página de status de lavagem...</p>
    </div>
  );
}

export default Status;