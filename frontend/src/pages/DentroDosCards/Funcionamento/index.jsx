import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Funcionamento() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>
      <h1>⚙️ Funcionamento</h1>
      <p>Conteúdo da página de funcionamento...</p>
    </div>
  );
}

export default Funcionamento;