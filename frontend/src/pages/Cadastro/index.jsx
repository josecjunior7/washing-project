import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "./../../assets/images/dashboard-logo.png";
import "./Cadastro.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome.trim()) { toast.warn("Por favor, digite seu nome!"); return; }
    if (!sobrenome.trim()) { toast.warn("Por favor, digite seu sobrenome!"); return; }
    if (!email.trim()) { toast.warn("Por favor, digite seu e-mail!"); return; }
    if (!telefone.trim()) { toast.warn("Por favor, digite seu telefone!"); return; }
    if (!senha) { toast.warn("Por favor, digite uma senha!"); return; }
    if (senha.length < 6) { toast.warn("A senha deve ter pelo menos 6 caracteres!"); return; }
    if (senha !== confirmarSenha) { toast.warn("As senhas não coincidem!"); return; }
    if (!aceitouTermos) { toast.warn("Você precisa aceitar os termos de uso para se cadastrar!"); return; }

    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:8080/api/cadastro', {
        nome: `${nome} ${sobrenome}`,
        email: email,
        telefone: telefone,
        senha: senha
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Cadastro realizado com sucesso! Faça login para continuar.");
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Este e-mail já está cadastrado! Use outro e-mail ou faça login.");
        } else {
          toast.error("Erro ao cadastrar. Tente novamente!");
        }
      } else {
        toast.error("Erro de conexão. Verifique se o backend está rodando!");
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltarLogin = () => navigate('/login');

  return (
    <main className="main-cadastro">
      <section className="painel-rg">

        <section className="logo-section">
          <section className="logo-container">
            <section className="logo">
              <img src={logo} alt="Logo" />
            </section>
          </section>
        </section>

        <h2 className="rg-titulo">CRIAR CONTA</h2>

        <section className="rg-nome-row">
          <section className="rg-i-email">
            <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />
            <label>
              <span style={{ transitionDelay: '0ms' }}>N</span>
              <span style={{ transitionDelay: '50ms' }}>o</span>
              <span style={{ transitionDelay: '100ms' }}>m</span>
              <span style={{ transitionDelay: '150ms' }}>e</span>
            </label>
          </section>
          <section className="rg-i-email">
            <input type="text" required value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
            <label>
              <span style={{ transitionDelay: '0ms' }}>S</span>
              <span style={{ transitionDelay: '50ms' }}>o</span>
              <span style={{ transitionDelay: '100ms' }}>b</span>
              <span style={{ transitionDelay: '150ms' }}>r</span>
              <span style={{ transitionDelay: '200ms' }}>e</span>
              <span style={{ transitionDelay: '250ms' }}>n</span>
              <span style={{ transitionDelay: '300ms' }}>o</span>
              <span style={{ transitionDelay: '350ms' }}>m</span>
              <span style={{ transitionDelay: '400ms' }}>e</span>
            </label>
          </section>
        </section>

        <section className="rg-i-email">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>
            <span style={{ transitionDelay: '0ms' }}>E</span>
            <span style={{ transitionDelay: '50ms' }}>m</span>
            <span style={{ transitionDelay: '100ms' }}>a</span>
            <span style={{ transitionDelay: '150ms' }}>i</span>
            <span style={{ transitionDelay: '200ms' }}>l</span>
          </label>
        </section>

        <section className="rg-i-tel">
          <input type="tel" required value={telefone} onChange={(e) => setTelefone(e.target.value)} />
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

        <section className="rg-senhas-row">
          <section className="rg-i-senha">
            <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
            <label>
              <span style={{ transitionDelay: '0ms' }}>S</span>
              <span style={{ transitionDelay: '50ms' }}>e</span>
              <span style={{ transitionDelay: '100ms' }}>n</span>
              <span style={{ transitionDelay: '150ms' }}>h</span>
              <span style={{ transitionDelay: '200ms' }}>a</span>
            </label>
          </section>
          <section className="rg-i-senha">
            <input type="password" required value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
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
            </label>
          </section>
        </section>

        <section className="rg-termos">
          <label className="rg-termos-label">
            <input type="checkbox" checked={aceitouTermos} onChange={(e) => setAceitouTermos(e.target.checked)} className="rg-checkbox" />
            <span className="rg-termos-texto">
              Eu li e aceito os{" "}
              <a href="#" onClick={(e) => e.preventDefault()} className="rg-termos-link">Termos de Uso</a>
            </span>
          </label>
        </section>

        <section className="btn-create">
          <button className="btn-primary" onClick={handleCadastro} disabled={carregando}>
            {carregando ? "CADASTRANDO..." : "CADASTRAR"}
          </button>
        </section>

        <h2 className="descricao">OU</h2>

        <section className="i-acc">
          <button className="btn-secundary" onClick={handleVoltarLogin}>JÁ TENHO CONTA</button>
        </section>

        <section className="return">
          <a onClick={handleVoltarLogin} className="return-link">← Voltar para o login</a>
        </section>

      </section>
    </main>
  );
};

export default Cadastro;