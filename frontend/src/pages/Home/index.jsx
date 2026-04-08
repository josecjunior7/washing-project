import React from "react";
import { FaUsers, FaSoap, FaTools, FaClipboardList, FaCogs } from "react-icons/fa";
import "./Home.css";
import Sidebar from "../../components/Sidebar";

function Home() {
  return (
    <section className="dashboard-container">

      <Sidebar />

      {/* HEADER */}
      <section className="dashboard-header">
        <h2>Home</h2>
        <span>08/04/2026</span>
      </section>

      {/* CARDS */}
      <section className="cards">

        <section className="card">
          <FaUsers className="icon clientes" />
          <p>CLIENTES</p>
          <h3>0</h3>
        </section>

        <section className="card">
          <FaSoap className="icon motos" />
          <p>MÁQUINAS</p>
          <h3>0</h3>
        </section>

        <section className="card">
          <FaTools className="icon servicos" />
          <p>SERVIÇOS</p>
          <h3>0</h3>
        </section>

        <section className="card">
          <FaClipboardList className="icon ordens" />
          <p>ORDENS ABERTAS</p>
          <h3>0</h3>
        </section>

        <section className="card">
          <FaCogs className="icon pecas" />
          <p>PEÇAS</p>
          <h3>0</h3>
        </section>

      </section>

      {/* PARTE INFERIOR */}
      <section className="content">

        <section className="box">
          <h3>Ordens Recentes</h3>
          <p className="empty">Nenhuma ordem de serviço encontrada</p>
        </section>

        <section className="box">
          <h3>Estatísticas do Mês</h3>

          <section className="stats">
            <section className="stat-item">
              <span>Serviços Concluídos</span>
              <strong>0</strong>
            </section>

            <section className="stat-item">
              <span>Receita Total</span>
              <strong>R$ 0,00</strong>
            </section>

            <section className="stat-item">
              <span>Peças Utilizadas</span>
              <strong>0</strong>
            </section>
          </section>
        </section>

      </section>
    </section>
  );
}

export default Home;