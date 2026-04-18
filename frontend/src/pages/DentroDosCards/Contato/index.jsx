import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Contato() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>
      <h1>📞 Contato</h1>
      <p>Entre em contato conosco:</p>
      <p>Email: contato@lavamais.com</p>
      <p>Telefone: (81) 99999-9999</p>
    </div>
  );
}

export default Contato;