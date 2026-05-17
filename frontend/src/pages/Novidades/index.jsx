import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaBars, FaTag, FaBullhorn, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import "./Novidades.css";

const NOVIDADES_PADRAO = [
  {
    tipo: "promocao",
    tag: "Promoção",
    titulo: "Lavagem + Secagem com 20% OFF",
    descricao: "Aproveite nossa promoção especial de combo! Ao contratar lavagem e secagem juntos, você ganha 20% de desconto no total. Válido até o fim do mês.",
    data: "17 Mai 2026",
    destaque: true,
  },
  {
    tipo: "aviso",
    tag: "Aviso",
    titulo: "Novo horário de funcionamento",
    descricao: "A partir desta semana, passamos a funcionar também aos domingos das 08h às 12h para melhor atender nossos clientes.",
    data: "15 Mai 2026",
    destaque: false,
  },
  {
    tipo: "servico",
    tag: "Novidade",
    titulo: "Serviço de lavagem expressa disponível",
    descricao: "Agora você pode solicitar lavagem expressa com entrega em até 3 horas! Ideal para quem precisa de roupas limpas com urgência.",
    data: "10 Mai 2026",
    destaque: false,
  },
  {
    tipo: "promocao",
    tag: "Promoção",
    titulo: "Traga um amigo e ganhe desconto",
    descricao: "Indique a Lava Mais para um amigo e ambos ganham R$5 de desconto no próximo agendamento. Sem limite de indicações!",
    data: "05 Mai 2026",
    destaque: false,
  },
  {
    tipo: "aviso",
    tag: "Aviso",
    titulo: "Manutenção programada — 20 Mai",
    descricao: "No dia 20 de maio realizaremos manutenção preventiva nas máquinas. O serviço ficará indisponível das 08h às 10h. Pedimos desculpas pelo inconveniente.",
    data: "03 Mai 2026",
    destaque: false,
  },
  {
    tipo: "servico",
    tag: "Novidade",
    titulo: "Agendamento pelo app facilitado",
    descricao: "Melhoramos o fluxo de agendamento! Agora é possível escolher máquina, horário e tipo de serviço em menos de 1 minuto.",
    data: "01 Mai 2026",
    destaque: false,
  },
];

function Novidades() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [novidades, setNovidades] = useState([]);

  const nomeUsuario = JSON.parse(localStorage.getItem('usuario'))?.nome || "Cliente";

  useEffect(() => {
    // Lê do localStorage; se não tiver nada usa os dados padrão
    const salvas = JSON.parse(localStorage.getItem('novidades'));
    if (salvas && salvas.length > 0) {
      setNovidades(salvas);
    } else {
      setNovidades(NOVIDADES_PADRAO);
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
              <p className="novidades-vazio">Nenhuma novidade encontrada.</p>
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