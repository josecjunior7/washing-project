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

  const handleLogin = async (e) => {
    e.preventDefault();
    
    
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email: email,
        senha: senha
      });

      if (response.status === 200) {
        localStorage.setItem('token', 'usuario-logado');
        navigate('/dashboard');
      }
    } catch (error) {
      alert("Erro ao logar. Verifique se o backend está rodando!");
    }
  };

  const handleRecuperarSenha = async () => {
    if (!emailRecuperar) {
      alert("Digite seu e-mail!");
      return;
    }
    alert(`E-mail de recuperação enviado para ${emailRecuperar}`);
    setModalSenha(false);
    setEmailRecuperar("");
  };

  return (
    <main className="main-login">
      {/* MODAL */}
      {modalSenha && (
        <section className="modal-overlay" onClick={() => setModalSenha(false)}>
          <section className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>RECUPERAR SENHA</h3>
            <input type="email" placeholder="Digite seu e-mail" value={emailRecuperar} onChange={(e) => setEmailRecuperar(e.target.value)} />
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
        <section className="i-senha">
          <input 
            type="password" 
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
        </section>

        {/* BOTÃO DE LOGIN */}
        <section className="btn-login">
          <button className="btn-primary" onClick={handleLogin}>LOGIN</button>
        </section>

        <h2 className="descricao">OU</h2>

        {/* BOTÃO DE REGISTRO */}
        <section className="btn-registro">
          <button className="btn-secundary">CADASTRE-SE</button>
        </section>

        {/* ESQUECEU SUA SENHA */}
        <section className="esqueceu-senha">
          <a onClick={() => setModalSenha(true)} className="link-esqueceu">ESQUECEU A SENHA?</a>
        </section>
      </section>
    </main>
  );
};

export default Login;