import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./../../assets/images/logo-test.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
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
        navigate('/home');
      }
    } catch (error) {
      alert("Erro ao logar. Verifique se o backend está rodando!");
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
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
    <main>
      {/* FAIXA AZUL NO TOPO */}
      <div className="top-bar">
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
      </div>

      {/* MENU QUE ABRE AO CLICAR */}
      {menuAberto && (
        <div className="menu-lateral">
          <div className="menu-item" onClick={() => navigate('/perfil')}>
            👤 Meu Perfil
          </div>
          <div className="menu-item" onClick={() => navigate('/configuracoes')}>
            ⚙️ Configurações
          </div>
          <div className="menu-item" onClick={() => navigate('/ajuda')}>
            ❓ Ajuda
          </div>
          <div className="menu-item" onClick={() => navigate('/')}>
            🚪 Sair
          </div>
        </div>
      )}

      {/* MODAL RECUPERAR SENHA */}
      {modalSenha && (
        <div className="modal-overlay" onClick={() => setModalSenha(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          </div>
        </div>
      )}

      {/* FORMULÁRIO DE LOGIN */}
      <section className="painel-login">
        {/* LOGO COM TEXTO LADO A LADO - MAIOR */}
        <div className="logo-container">
          <span className="logo-text-left">LAVA</span>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <span className="logo-text-right">MAIS</span>
        </div>

        {/* Input Email */}
        <div className="i-email">
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
        </div>

        {/* Input Senha */}
        <div className="i-senha">
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
        </div>

        <div className="btn-login">
          <button className="btn-primary" onClick={handleLogin}>
            LOGIN
          </button>
        </div>

        {/* ESQUECEU A SENHA */}
        <div className="esqueceu-senha">
          <a onClick={() => setModalSenha(true)} className="link-esqueceu">
            ESQUECEU A SENHA?
          </a>
        </div>

        <div>
          <h2 className="descricao">OU</h2>
        </div>

        <div className="btn-registro">
          <button className="btn-secundary">REGISTRE-SE</button>
        </div>
      </section>
    </main>
  );
};

export default Login;