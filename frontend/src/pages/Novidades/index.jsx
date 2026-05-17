import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaBars, FaTag, FaBullhorn, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import "./Novidades.css";

function Novidades() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [novidades, setNovidades] = useState([]);

  const nomeUsuario = JSON.parse(localStorage.getItem('usuario'))?.nome || "Cliente";

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem('novidades'));
    if (salvas && salvas.length > 0) {
      setNovidades(salvas);
    } else {
      setNovidades([]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const filtradas = filtro === "todos"
    ? novidades
    : novidades.filter(n => n.tipo === filtro);

  const getIcone = (tipo) => {
    if (tipo === "promocao") return <FaTag />;
    if (tipo === "aviso")    return <FaBullhorn />;
    return <FaInfoCircle />;
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
            <section className="welcome-text">
              <span>Fique por dentro,</span>
              <h2 className="user">Novidades</h2>
            </section>
          </section>
          <section className="header-right">
            <button className="btn-carrinho" onClick={() => navigate('/carrinho')}>
              <FaShoppingCart />
            </button>
            <section className="avatar-circle">
              {nomeUsuario.charAt(0)}
            </section>
          </section>
        </header>

        <section className="novidades-body">

          {/* FILTROS */}
          <section className="novidades-filtros">
            {[
              { valor: "todos",    label: "Todos"     },
              { valor: "promocao", label: "Promoções" },
              { valor: "servico",  label: "Serviços"  },
              { valor: "aviso",    label: "Avisos"    },
            ].map((f) => (
              <button
                key={f.valor}
                className={`filtro-btn ${filtro === f.valor ? "ativo" : ""}`}
                onClick={() => setFiltro(f.valor)}
              >
                {f.label}
              </button>
            ))}
          </section>

          {/* CARDS */}
          <section className="novidades-grid">
            {filtradas.length === 0 ? (
              <section className="novidades-vazio-state">
                <FaBullhorn className="vazio-icone" />
                <h3>Nenhuma novidade por aqui ainda</h3>
                <p>Fique ligado! Em breve teremos promoções e novidades para você.</p>
              </section>
            ) : filtradas.map((n, i) => (
              <section key={i} className={`novidade-card ${n.tipo} ${n.destaque ? "destaque" : ""}`}>
                <div className="novidade-tag">
                  {getIcone(n.tipo)}
                  <span>{n.tag}</span>
                </div>
                <h3 className="novidade-titulo">{n.titulo}</h3>
                <p className="novidade-descricao">{n.descricao}</p>
                <span className="novidade-data">{n.data}</span>
              </section>
            ))}
          </section>

        </section>
      </main>
    </section>
  );
}

export default Novidades;