/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./../../assets/images/logo-test.png";
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
        navigate('/dashboard');
      }
    } catch (error) {
      alert("Erro ao logar. Verifique se o backend está rodando!");
      console.error(error);
    }
  };

  const handleRecuperarSenha = async () => {
    if (!emailRecuperar) {
      alert("Digite seu e-mail!");
      return;
    }
    
    try {
      // Aqui você vai conectar com o backend
      // await axios.post('http://localhost:8080/api/recuperar-senha', {
      //   email: emailRecuperar
      // });
      
      alert(`E-mail de recuperação enviado para ${emailRecuperar}`);
      setModalSenha(false);
      setEmailRecuperar("");
    } catch (error) {
      alert("Erro ao enviar e-mail de recuperação!");
      console.error(error);
    }
  };

  return (
    <main className="main-login">

      {/* MODAL RECUPERAR SENHA */}
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
            <button className="modal-btn" onClick={handleRecuperarSenha}>
              ENVIAR
            </button>
            <button className="modal-btn-fechar" onClick={() => setModalSenha(false)}>
              CANCELAR
            </button>
          </section>
        </section>
      )}

      {/* PAINEL DE LOGIN */}
      <section className="painel-login">

      
        {/* LOGO COM TEXTO MAIOR E SUBTÍTULO */}
        <section className="logo-section">

          {/* CONTAINER */}
          <section className="logo-container">
            
            {/* TEXTO DIREITA */}
            <span className="logo-text-left">LAVA</span>
            {/* LOGO */}
            <section className="logo">
              <img src={logo} alt="Logo" />
            </section>
            {/* TEXTO ESQUERDA */}
            <span className="logo-text-right">MAIS</span>

          </section>

          {/* DESCRIÇÃO */}
          <section className="logo-subtitle">
            LAVANDERIA AUTOSSERVIÇO
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
            <span style={{ transitionDelay: '50ms' }}>M</span>
            <span style={{ transitionDelay: '100ms' }}>A</span>
            <span style={{ transitionDelay: '150ms' }}>I</span>
            <span style={{ transitionDelay: '200ms' }}>L</span>
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
            <span style={{ transitionDelay: '50ms' }}>E</span>
            <span style={{ transitionDelay: '100ms' }}>N</span>
            <span style={{ transitionDelay: '150ms' }}>H</span>
            <span style={{ transitionDelay: '200ms' }}>A</span>
          </label>
        </section>

        {/* BOTÃO DE LOGIN */}
        <section className="btn-login">
          <button className="btn-primary" onClick={handleLogin}>
            LOGIN
          </button>
        </section>

        <section>
          <h2 className="descricao">OU</h2>
        </section>

        {/* BOTÃO DE REGISTRO */}
        <section className="btn-registro">
          <button className="btn-secundary">CADASTRE-SE</button>
        </section>

        {/* ESQUECEU A SENHA */}
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