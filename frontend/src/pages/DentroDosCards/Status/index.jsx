import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import statusImage from "./STATUS_DE_LAVAGEM.png";  // ← CAMINHO ATUALIZADO
import './Status.css';

function Status() {
  const navigate = useNavigate();
  
  // Estado atual do status (1=Recebido, 2=Preparando, 3=Pronto)
  const [statusAtual, setStatusAtual] = useState(2);

  const etapas = [
    { id: 1, nome: "RECEBIDO" },
    { id: 2, nome: "PREPARANDO" },
    { id: 3, nome: "PRONTO PARA RETIRADA" }
  ];

  return (
    <div className="status-container">
      {/* Botão voltar */}
      <button className="btn-voltar" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>

      {/* Imagem exportada do Figma */}
      <img 
        src={statusImage} 
        alt="Status da Lavagem" 
        className="status-imagem" 
      />

      {/* Título */}
      <h1 className="status-title">STATUS DA LAVAGEM</h1>

      {/* Explicação */}
      <p className="status-explicacao">
        O retângulo verde indica o status atual do seu pedido no sistema.
      </p>

      {/* Linha do tempo */}
      <div className="timeline">
        {etapas.map((etapa, index) => (
          <div key={etapa.id} className="timeline-item">
            <div className={`timeline-circle ${statusAtual >= etapa.id ? 'active' : ''}`}>
              {etapa.id}
            </div>
            {index < etapas.length - 1 && <div className="timeline-line"></div>}
            <div className="timeline-label">{etapa.nome}</div>
          </div>
        ))}
      </div>

      {/* Informação do pedido */}
      <div className="pedido-info">
        <h3>Pedido #12345</h3>
        <p>Data: 18/04/2026</p>
        <p>Status atual: <strong className="status-verde">{etapas.find(e => e.id === statusAtual)?.nome}</strong></p>
      </div>
    </div>
  );
}

export default Status;