import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./../../assets/images/dashboard-logo.png";
import "./../Login/Login.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Por favor, digite seu nome completo!");
      return;
    }

    if (!email.trim()) {
      alert("Por favor, digite seu e-mail!");
      return;
    }

    if (!telefone.trim()) {
      alert("Por favor, digite seu telefone!");
      return;
    }

    if (!senha) {
      alert("Por favor, digite uma senha!");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!aceitouTermos) {
      alert("Você precisa aceitar os termos de uso para se cadastrar!");
      return;
    }

    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:8080/api/cadastro', {
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha
      });

      if (response.status === 200 || response.status === 201) {
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert("Este e-mail já está cadastrado! Use outro e-mail ou faça login.");
        } else {
          alert("Erro ao cadastrar. Tente novamente!");
        }
      } else {
        alert("Erro de conexão. Verifique se o backend está rodando!");
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltarLogin = () => {
    navigate('/login');
  };

  return (
    <main className="main-login">
      <section className="painel-login">
        <section className="logo-section">
          <section className="logo-container">
            <section className="logo">
              <img src={logo} alt="Logo" />
            </section>
          </section>
        </section>

        <h2 style={{ 
          textAlign: "center", 
          color: "#6a11cb", 
          marginBottom: "20px",
          fontSize: "24px"
        }}>
          CRIAR CONTA
        </h2>

        <section className="i-email">
          <input 
            type="text" 
            required 
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
          />
          <label>
            <span style={{ transitionDelay: '0ms' }}>N</span>
            <span style={{ transitionDelay: '50ms' }}>o</span>
            <span style={{ transitionDelay: '100ms' }}>m</span>
            <span style={{ transitionDelay: '150ms' }}>e</span>
            <span style={{ transitionDelay: '200ms' }}> </span>
            <span style={{ transitionDelay: '250ms' }}>c</span>
            <span style={{ transitionDelay: '300ms' }}>o</span>
            <span style={{ transitionDelay: '350ms' }}>m</span>
            <span style={{ transitionDelay: '400ms' }}>p</span>
            <span style={{ transitionDelay: '450ms' }}>l</span>
            <span style={{ transitionDelay: '500ms' }}>e</span>
            <span style={{ transitionDelay: '550ms' }}>t</span>
            <span style={{ transitionDelay: '600ms' }}>o</span>
          </label>
        </section>

        <section className="i-email">
          <input 
            type="email" 
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

        <section className="i-email">
          <input 
            type="tel" 
            required 
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)} 
            placeholder="(00) 00000-0000"
          />
          <label>
            <span style={{ transitionDelay: '0ms' }}>T</span>
            <span style={{ transitionDelay: '50ms' }}>e</span>
            <span style={{ transitionDelay: '100ms' }}>l</span>
            <span style={{ transitionDelay: '150ms' }}>e</span>
            <span style={{ transitionDelay: '200ms' }}>f</span>
            <span style={{ transitionDelay: '250ms' }}>o</span>
            <span style={{ transitionDelay: '300ms' }}>n</span>
            <span style={{ transitionDelay: '350ms' }}>e</span>
          </label>
        </section>

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

        <section className="i-senha">
          <input 
            type="password" 
            required 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)} 
          />
          <label>
            <span style={{ transitionDelay: '0ms' }}>C</span>
            <span style={{ transitionDelay: '50ms' }}>o</span>
            <span style={{ transitionDelay: '100ms' }}>n</span>
            <span style={{ transitionDelay: '150ms' }}>f</span>
            <span style={{ transitionDelay: '200ms' }}>i</span>
            <span style={{ transitionDelay: '250ms' }}>r</span>
            <span style={{ transitionDelay: '300ms' }}>m</span>
            <span style={{ transitionDelay: '350ms' }}>a</span>
            <span style={{ transitionDelay: '400ms' }}>r</span>
            <span style={{ transitionDelay: '450ms' }}> </span>
            <span style={{ transitionDelay: '500ms' }}>s</span>
            <span style={{ transitionDelay: '550ms' }}>e</span>
            <span style={{ transitionDelay: '600ms' }}>n</span>
            <span style={{ transitionDelay: '650ms' }}>h</span>
            <span style={{ transitionDelay: '700ms' }}>a</span>
          </label>
        </section>

        <section style={{ margin: "20px 0", textAlign: "center" }}>
          <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" }}>
            <input 
              type="checkbox" 
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
            <span style={{ fontSize: "12px", color: "#6a11cb" }}>
              Eu li e aceito os <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#00ffff", textDecoration: "none" }}>Termos de Uso</a>
            </span>
          </label>
        </section>

        <section className="btn-login">
          <button className="btn-primary" onClick={handleCadastro} disabled={carregando}>
            {carregando ? "CADASTRANDO..." : "CADASTRAR"}
          </button>
        </section>

        <h2 className="descricao">OU</h2>

        <section className="btn-registro">
          <button className="btn-secundary" onClick={handleVoltarLogin}>
            JÁ TENHO CONTA
          </button>
        </section>

        <section className="esqueceu-senha">
          <a onClick={handleVoltarLogin} className="link-esqueceu">
            ← Voltar para o login
          </a>
        </section>
      </section>
    </main>
  );
};

export default Cadastro;