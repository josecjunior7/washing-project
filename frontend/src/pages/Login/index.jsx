import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./../../assets/images/logo-test.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // 1. Criar estados para armazenar o que o usuário digita
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // 2. Função de Login dentro do componente
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede a página de recarregar
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

  return (
    <main>
      <section className="painel-login">
        <section className="logo">
          <img src={logo} alt="Logo" />
        </section>

        {/* Input Email */}
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

        {/* Input Senha */}
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

        <section className="btn-login">
          <button className="btn-primary" onClick={handleLogin}>
            Login
          </button>
        </section>

        <section>
          <h2 className="descricao">Ou</h2>
        </section>

        <section className="btn-registro">
          <button className="btn-secundary">Registre-se</button>
        </section>
      </section>
    </main>
  );
};

export default Login;