import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaBars, FaSave, FaUserCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Perfil.css";

function Perfil() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) {
      setNome(user.nome || "Cliente");
      setEmail(user.email || "cliente@email.com");
      setTelefone(user.telefone || "(87) 99999-9999");
    }
    setEndereco("Av. Joaquim Nabuco, 209 - Sertânia, PE");
    setDataCadastro("15/03/2024");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSalvar = () => {
    const user = JSON.parse(localStorage.getItem('usuario')) || {};
    user.nome = nome;
    user.email = email;
    user.telefone = telefone;
    localStorage.setItem('usuario', JSON.stringify(user));
    setEditando(false);
    toast.success("Dados atualizados com sucesso!");
  };

  const handleCancelar = () => {
    setEditando(false);
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) {
      setNome(user.nome || "Cliente");
      setEmail(user.email || "cliente@email.com");
      setTelefone(user.telefone || "(87) 99999-9999");
    }
  };

  return (
    <section className="home-layout">
      <Sidebar
        aberta={sidebarAberta}
        setAberta={setSidebarAberta}
        navigate={navigate}
        handleLogout={handleLogout}
      />

      <main className="main-content">
        <header className="header-home">
          <section className="header-left">
            <button className="btn-hamburguer" onClick={() => setSidebarAberta(true)}><FaBars /></button>
            <button className="btn-voltar-perfil" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Voltar
            </button>
            <section className="welcome-text">
              <span>Bem-vindo de volta,</span>
              <h2 className="user">{nome}</h2>
            </section>
          </section>
          <section className="avatar-circle">
            {nome ? nome.charAt(0) : "C"}
          </section>
        </header>

        <section className="home-body">
          <div className="perfil-container">
            <div className="perfil-card">
              <div className="perfil-header">
                <div className="perfil-avatar">
                  <FaUserCircle />
                </div>
                <h2>Meu Perfil</h2>
                <p>Gerencie suas informações pessoais</p>
              </div>

              <div className="perfil-info">
                <div className="info-group">
                  <label><FaUser /> Nome Completo</label>
                  {editando ? (
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="perfil-input" />
                  ) : (
                    <p>{nome}</p>
                  )}
                </div>

                <div className="info-group">
                  <label><FaEnvelope /> E-mail</label>
                  {editando ? (
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="perfil-input" />
                  ) : (
                    <p>{email}</p>
                  )}
                </div>

                <div className="info-group">
                  <label><FaPhone /> Telefone</label>
                  {editando ? (
                    <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="perfil-input" />
                  ) : (
                    <p>{telefone}</p>
                  )}
                </div>

                <div className="info-group">
                  <label><FaMapMarkerAlt /> Endereço</label>
                  <p>{endereco}</p>
                </div>

                <div className="info-group">
                  <label><FaCalendarAlt /> Data de Cadastro</label>
                  <p>{dataCadastro}</p>
                </div>
              </div>

              <div className="perfil-actions">
                {editando ? (
                  <>
                    <button className="btn-salvar" onClick={handleSalvar}>
                      <FaSave /> Salvar Alterações
                    </button>
                    <button className="btn-cancelar" onClick={handleCancelar}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button className="btn-editar" onClick={() => setEditando(true)}>
                    <FaEdit /> Editar Perfil
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

export default Perfil;