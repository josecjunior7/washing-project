import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Novidades() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>
      <h1>📢 Novidades</h1>
      <p>Conteúdo da página de novidades...</p>
    </div>
  );
}

export default Novidades;