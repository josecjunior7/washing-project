import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./../../assets/images/dashboard-logo.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [modalSenha, setModalSenha] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
const [mostrarSenha, setMostrarSenha] = useState(false); // 👈 ADD AQUI

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) { alert("Digite seu e-mail!"); return; }
    if (!senha.trim()) { alert("Digite sua senha!");  return; }

    setCarregando(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email: email,
        senha: senha
      });

      if (response.status === 200) {
        localStorage.setItem('token', 'usuario-logado');
        localStorage.setItem('usuario', JSON.stringify(response.data));

        if (response.data.role === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/home';
        }
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("E-mail ou senha incorretos!");
        } else {
          alert("Erro ao logar. Tente novamente!");
        }
      } else {
        alert("Erro de conexao. O backend esta rodando?");
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleRecuperarSenha = async () => {
    if (!emailRecuperar) {
      alert("Digite seu e-mail!");
      return;
    }
    alert(`E-mail de recuperacao enviado para ${emailRecuperar}`);
    setModalSenha(false);
    setEmailRecuperar("");
  };

  const handleIrParaCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <main className="main-login">

      {/* MODAL */}
      {modalSenha && (
        <section className="modal-overlay" onClick={() => setModalSenha(false)}>
          <section className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>RECUPERAR SENHA</h3>
            <input 
              type="email" 
              placeholder="Digite seu e-mail" 
              value={emailRecuperar} 
              onChange={(e) => setEmailRecuperar(e.target.value)} 
            />
            <button className="modal-btn" onClick={handleRecuperarSenha}>ENVIAR</button>
            <button className="modal-btn-fechar" onClick={() => setModalSenha(false)}>CANCELAR</button>
          </section>
        </section>
      )}

      {/* PAINEL DE LOGIN */}
      <section className="painel-login">

        {/* LOGO */}
        <section className="logo-section">
          <section className="logo-container">
            <section className="logo"><img src={logo} alt="Logo" /></section>
          </section>
        </section>

        {/* INPUT EMAIL */}
        <section className="i-email">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            <span style={{ transitionDelay: '0ms' }}>E</span>
            <span style={{ transitionDelay: '50ms' }}>m</span>
            <span style={{ transitionDelay: '100ms' }}>a</span>
            <span style={{ transitionDelay: '150ms' }}>i</span>
            <span style={{ transitionDelay: '200ms' }}>l</span>
          </label>
        </section>

       {/* INPUT SENHA */}
<section className="i-senha" style={{ position: "relative" }}>
  <input
    type={mostrarSenha ? "text" : "password"}
    required
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
  />
  <label>
    <span style={{ transitionDelay: '0ms' }}>S</span>
    <span style={{ transitionDelay: '50ms' }}>e</span>
    <span style={{ transitionDelay: '100ms' }}>n</span>
    <span style={{ transitionDelay: '150ms' }}>h</span>
    <span style={{ transitionDelay: '200ms' }}>a</span>
  </label>
  <span
  onClick={() => setMostrarSenha(!mostrarSenha)}
  style={{
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#888",
  }}
>
  {mostrarSenha ? (
    // Olho aberto (está vendo)
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    // Olho riscado (está oculto)
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7 19 2.73 15.11 1 12c.74-1.56 1.93-3.03 3.44-4.22"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c5 0 9.27 3.89 11 7a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M10.73 10.73A3 3 0 0 0 12 15a3 3 0 0 0 2.27-1.02"/>
    </svg>
  )}
</span>
</section>

        {/* BOTAO DE LOGIN */}
        <section className="btn-login">
          <button className="btn-primary" onClick={handleLogin} disabled={carregando}>
            {carregando ? "ENTRANDO..." : "LOGIN"}
          </button>
        </section>

        <h2 className="descricao">OU</h2>

        {/* BOTAO DE REGISTRO */}
        <section className="btn-registro">
          <button className="btn-secundary" onClick={handleIrParaCadastro}>CADASTRE-SE</button>
        </section>

        {/* ESQUECEU SUA SENHA */}
        <section className="esqueceu-senha">
          <a onClick={() => setModalSenha(true)} className="link-esqueceu">
            ESQUECEU A SENHA?
          </a>
        </section>

      </section>
    </main>
  );
};

export default Login;