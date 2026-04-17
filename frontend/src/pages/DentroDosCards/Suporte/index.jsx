import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Suporte() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>
      <h1>🛠️ Suporte</h1>
      <p>Conteúdo da página de suporte...</p>
    </div>
  );
}

export default Suporte;