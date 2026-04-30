import React from "react";
import "./LandingPage.css";
import home from "../../assets/images/home.png";
import HeaderPublic from "../../components/HeaderPublic";

const LandingPage = () => {

  const copiarEndereco = () => {
    const endereco = "Av. Joaquim Nabuco, 209 - Sertânia, PE, 56600-000";
    navigator.clipboard.writeText(endereco);
    alert("Endereço copiado com sucesso!");
  };

  return (
    <section className="home-container">
      
      {/* IMAGEM DE FUNDO */}
      <img
        src={home}
        alt="Home Layout"
        className="home-bg-image"
      />

      {/* HEADER COMPONENTE */}
      <HeaderPublic />

      {/* PAINEL PRINCIPAL */}
      <main className="info-panel">

        {/* CARD 1: LOCALIZAÇÃO */}
        <section className="info-card">
          <h3>Localização</h3>
          <p>Av. Joaquim Nabuco, 209 - Sertânia, PE, 56600-000</p>
          <button
            className="btn-copiar"
            onClick={copiarEndereco}
          >
          Copiar endereço
          </button>
        </section>

        {/* CARD 2: MAPA */}
        <section className="info-card">
          <h3>Mapa do local</h3>
          <iframe
            title="Mapa Lavamais"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.544665487635!2d-37.2662058!3d-8.0754877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a8927926955555%3A0x6e9f8e48a1c8b3!2sAv.%20Joaquim%20Nabuco%2C%20209%20-%20Sert%C3%A2nia%2C%20PE!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
            className="mapa-iframe"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>

        {/* CARD 3: HORÁRIO */}
        <section className="info-card">
          <section className="card-hours">
            <h3>Horário de funcionamento</h3>
            <p><strong>6h - 21h</strong> (todos os dias)</p>
            <p className="atendente">Atendente:</p>
            <p>Segunda - Sexta: 08h - 12h</p>
            <p>Sábado: 08h - 12h</p>
          </section>
        </section>

      </main>

    </section>
  );
};

export default LandingPage;