import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Instagram() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>
      <h1>📷 Instagram</h1>
      <p>Siga-nos no Instagram:</p>
      <p>@lavamais</p>
      <p>Link: instagram.com/lavamais</p>
    </div>
  );
}

export default Instagram;