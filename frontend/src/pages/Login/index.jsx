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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) { alert("Digite seu e-mail!"); return; }
    if (!senha.trim()) { alert("Digite sua senha!");  return; }

    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email: email,
        senha: senha
      });

      if (response.status === 200) {
        localStorage.setItem('token', 'usuario-logado');
        localStorage.setItem('usuario', JSON.stringify(response.data));

        navigate('/home');
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
          <label>Email</label>
        </section>

        {/* INPUT SENHA */}
        <section className="i-senha">
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label>Senha</label>
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