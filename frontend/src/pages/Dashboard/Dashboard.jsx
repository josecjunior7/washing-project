import React from "react";
import { FaUsers, FaSoap, FaTools, FaClipboardList, FaCogs, FaMoneyBill, FaTrash, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* CABEÇALHO */}
      <div className="dashboard-header">
        <h2>Gestão da Lavanderia</h2>
        <div className="header-right">
          <span>{dataAtual}</span>
          <button className="btn-logout" onClick={handleLogout}><FaSignOutAlt /> Sair</button>
        </div>
      </div>

      {/* CARDS PRINCIPAIS */}
      <div className="cards">
        <div className="card"><FaUsers className="icon clientes" /><p>CLIENTES</p><h3>0</h3></div>
        <div className="card"><FaSoap className="icon motos" /><p>MÁQUINAS</p><h3>0</h3></div>
        <div className="card"><FaTools className="icon servicos" /><p>SERVIÇOS</p><h3>0</h3></div>
        <div className="card"><FaClipboardList className="icon ordens" /><p>ORDENS ABERTAS</p><h3>0</h3></div>
        <div className="card"><FaCogs className="icon pecas" /><p>PEÇAS</p><h3>0</h3></div>
      </div>

      {/* RECEITA, CANCELAMENTOS, USUÁRIOS */}
      <div className="cards">
        <div className="card"><FaMoneyBill className="icon" style={{ color: '#4da6ff' }} /><p>RECEITA</p>
          <div className="stats-small">
            <div className="stat-item-small"><span>Hoje</span><strong>R$ 0,00</strong></div>
            <div className="stat-item-small"><span>Semana</span><strong>R$ 0,00</strong></div>
            <div className="stat-item-small"><span>Mês</span><strong>R$ 0,00</strong></div>
          </div>
        </div>
        <div className="card"><FaTrash className="icon" style={{ color: '#ff9ff3' }} /><p>CANCELAMENTOS</p>
          <div className="stats-small">
            <div className="stat-item-small"><span>Hoje</span><strong>0</strong></div>
            <div className="stat-item-small"><span>Semana</span><strong>0</strong></div>
            <div className="stat-item-small"><span>Mês</span><strong>0</strong></div>
          </div>
        </div>
        <div className="card"><FaUserCog className="icon" style={{ color: '#74b9ff' }} /><p>USUÁRIOS</p>
          <div className="stats-small">
            <div className="stat-item-small"><span>Clientes</span><strong>0</strong></div>
            <div className="stat-item-small"><span>Funcionários</span><strong>0</strong></div>
            <div className="stat-item-small"><span>Novos hoje</span><strong>0</strong></div>
          </div>
        </div>
      </div>

      {/* BOXES LADO A LADO */}
      <div className="quatro-boxes">
        <div className="box"><h3>⏰ Horários Mais Utilizados</h3>
          <div className="linha-info"><span>08:00 - 10:00</span><strong>0</strong></div>
          <div className="linha-info"><span>10:00 - 12:00</span><strong>0</strong></div>
          <div className="linha-info"><span>14:00 - 16:00</span><strong>0</strong></div>
          <div className="linha-info"><span>16:00 - 18:00</span><strong>0</strong></div>
          <div className="linha-info"><span>18:00 - 20:00</span><strong>0</strong></div>
        </div>
        <div className="box"><h3>🔄 Status das Máquinas</h3>
          <div className="linha-info"><span>🟢 Máquina 1 (Lavar)</span><strong>Disponível</strong></div>
          <div className="linha-info"><span>🔴 Máquina 2 (Lavar)</span><strong>Ocupada</strong></div>
          <div className="linha-info"><span>🟢 Máquina 3 (Secar)</span><strong>Disponível</strong></div>
          <div className="linha-info"><span>🔴 Máquina 4 (Secar)</span><strong>Ocupada</strong></div>
          <div className="linha-info"><span>🟢 Máquina 5 (Lavar)</span><strong>Disponível</strong></div>
        </div>
        <div className="box"><h3>📋 Ordens Recentes</h3><div className="vazio">Nenhuma ordem encontrada</div></div>
        <div className="box"><h3>📊 Estatísticas do Mês</h3>
          <div className="linha-info"><span>Serviços Concluídos</span><strong>0</strong></div>
          <div className="linha-info"><span>Receita Total</span><strong>R$ 0,00</strong></div>
          <div className="linha-info"><span>Peças Utilizadas</span><strong>0</strong></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;