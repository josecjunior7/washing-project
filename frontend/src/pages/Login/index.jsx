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
    
    // LOGIN MOCKADO PARA TESTE
    if (email === "admin@email.com" && senha === "123456") {
      localStorage.setItem('token', 'usuario-logado');
      navigate('/dashboard');
      return;
    }
    
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
        <div className="modal-overlay" onClick={() => setModalSenha(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>RECUPERAR SENHA</h3>
            <input type="email" placeholder="Digite seu e-mail" value={emailRecuperar} onChange={(e) => setEmailRecuperar(e.target.value)} />
            <button className="modal-btn" onClick={handleRecuperarSenha}>ENVIAR</button>
            <button className="modal-btn-fechar" onClick={() => setModalSenha(false)}>CANCELAR</button>
          </div>
        </div>
      )}

      {/* PAINEL DE LOGIN */}
      <div className="painel-login">
        
        {/* APENAS A LOGO - SEM TEXTO "LAVA MAIS" */}
        <div className="logo-section">
          <div className="logo-container">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </div>
        </div>

        <div className="i-email">
          <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label><span>E</span><span>M</span><span>A</span><span>I</span><span>L</span></label>
        </div>

        <div className="i-senha">
          <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
          <label><span>S</span><span>E</span><span>N</span><span>H</span><span>A</span></label>
        </div>

        <div className="btn-login">
          <button className="btn-primary" onClick={handleLogin}>LOGIN</button>
        </div>

        <h2 className="descricao">OU</h2>

        <div className="btn-registro">
          <button className="btn-secundary">CADASTRE-SE</button>
        </div>

        <div className="esqueceu-senha">
          <a onClick={() => setModalSenha(true)} className="link-esqueceu">ESQUECEU A SENHA?</a>
        </div>
      </div>
    </main>
  );
};

export default Login;