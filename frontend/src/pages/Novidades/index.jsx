import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome, IconSpeakerphone, IconCalendar, IconHistory,
  IconCreditCard, IconClock, IconUser, IconLogout,
  IconDroplet, IconShoppingCart, IconTicket, IconFlame,
  IconSparkles, IconRefresh, IconRosetteDiscount,
  IconPercentage, IconStar, IconBell, IconTag,
  IconArrowRight, IconInfinity,
} from "@tabler/icons-react";
import "./Novidades.css";

const Novidades = () => {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("todos");

  const cards = [
    {
      id: 1, cat: "cupom", cor: "purple",
      Icone: IconTicket, badge: "Cupom",
      titulo: "10% off na próxima lavagem",
      desc: "Use o cupom abaixo no agendamento e garanta seu desconto imediatamente.",
      cupom: "LAVA10",
      rodape: "Válido até 30/05/2026",
      RodapeIcone: IconClock,
    },
    {
      id: 2, cat: "cupom", cor: "purple",
      Icone: IconTicket, badge: "Cupom",
      titulo: "Primeira lavagem grátis",
      desc: "Indique um amigo e ganhe sua próxima lavagem sem custo algum.",
      cupom: "INDICA",
      rodape: "Sem prazo de validade",
      RodapeIcone: IconInfinity,
    },
    {
      id: 3, cat: "cupom", cor: "purple",
      Icone: IconTicket, badge: "Cupom",
      titulo: "R$ 15 off no fim de semana",
      desc: "Válido apenas para agendamentos às sextas, sábados e domingos.",
      cupom: "FDS15",
      rodape: "Válido até 15/06/2026",
      RodapeIcone: IconClock,
    },
    {
      id: 4, cat: "promo", cor: "teal",
      Icone: IconRosetteDiscount, badge: "Promoção",
      titulo: "Leve 3, pague 2",
      desc: "Agende 3 lavagens e a 3ª sai de graça. Válido em junho.",
      destaque: "3×2",
      destaqueLabel: "nas lavagens de junho",
      rodape: "Junho/2026",
      RodapeIcone: IconCalendar,
    },
    {
      id: 5, cat: "promo", cor: "teal",
      Icone: IconPercentage, badge: "Promoção",
      titulo: "Fidelidade: 20% off permanente",
      desc: "Clientes com 5+ agendamentos ganham desconto fixo de 20% em todas as lavagens.",
      destaque: "20%",
      destaqueLabel: "para clientes fiéis",
      progresso: 60,
      progressoLabel: "Você tem 3/5 agendamentos",
      rodape: "Benefício permanente",
      RodapeIcone: IconStar,
    },
    {
      id: 6, cat: "novo", cor: "amber",
      Icone: IconStar, badge: "Novidade",
      titulo: "Lavagem a seco disponível!",
      desc: "Adicionamos o serviço de lavagem a seco para roupas delicadas e peças especiais.",
      tag: "Serviço recém-lançado",
      TagIcone: IconSparkles,
      rodape: "Disponível agora",
      RodapeIcone: IconClock,
    },
    {
      id: 7, cat: "novo", cor: "amber",
      Icone: IconClock, badge: "Novidade",
      titulo: "Entrega expressa em 2h",
      desc: "Novo serviço de entrega expressa! Suas peças lavadas de volta em até 2 horas.",
      tag: "Disponível em breve",
      TagIcone: IconSparkles,
      rodape: "Lançamento: julho/2026",
      RodapeIcone: IconCalendar,
    },
    {
      id: 8, cat: "atualiz", cor: "blue",
      Icone: IconRefresh, badge: "Atualização",
      titulo: "App atualizado — versão 2.0",
      desc: "Novos recursos: acompanhamento em tempo real e notificações automáticas.",
      progresso: 87,
      progressoLabel: "87% de aprovação dos clientes",
      rodape: "Atualizado em maio/2026",
      RodapeIcone: IconClock,
    },
    {
      id: 9, cat: "atualiz", cor: "blue",
      Icone: IconBell, badge: "Atualização",
      titulo: "Notificações por WhatsApp",
      desc: "Receba atualizações do status da sua lavagem direto no WhatsApp.",
      tag: "Integração ativa",
      TagIcone: IconBell,
      rodape: "Disponível agora",
      RodapeIcone: IconClock,
    },
  ];

  const abas = [
    { key: "todos",   label: "Todos",        Icone: null },
    { key: "cupom",   label: "Cupons",       Icone: IconTicket },
    { key: "promo",   label: "Promoções",    Icone: IconFlame },
    { key: "novo",    label: "Novidades",    Icone: IconSparkles },
    { key: "atualiz", label: "Atualizações", Icone: IconRefresh },
  ];

  const filtrados = abaAtiva === "todos"
    ? cards
    : cards.filter((c) => c.cat === abaAtiva);

  const copiar = (codigo, e) => {
    navigator.clipboard.writeText(codigo).catch(() => {});
    const btn = e.currentTarget;
    btn.textContent = "Copiado!";
    btn.classList.add("copiado");
    setTimeout(() => {
      btn.textContent = "Copiar";
      btn.classList.remove("copiado");
    }, 2000);
  };

  return (
    <main className="main-novidades">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-sidebar">
          <div className="logo-mark">
            <IconDroplet size={20} color="white" />
          </div>
          <div className="logo-texto">Lava<span>mais</span></div>
        </div>

        <nav className="nav">
          <a className="nav-item" onClick={() => navigate("/home")}>
            <IconHome size={18} /> Início
          </a>
          <a className="nav-item active">
            <IconSpeakerphone size={18} /> Novidades
          </a>
          <a className="nav-item" onClick={() => navigate("/agendamento")}>
            <IconCalendar size={18} /> Agendamento
          </a>
          <a className="nav-item" onClick={() => navigate("/historico")}>
            <IconHistory size={18} /> Histórico
          </a>
          <a className="nav-item" onClick={() => navigate("/pagamentos")}>
            <IconCreditCard size={18} /> Pagamentos
          </a>
          <a className="nav-item" onClick={() => navigate("/status")}>
            <IconClock size={18} /> Status
          </a>
          <a className="nav-item" onClick={() => navigate("/perfil")}>
            <IconUser size={18} /> Meu Perfil
          </a>
        </nav>

        <div className="sidebar-footer">
          <span className="sair" onClick={() => navigate("/")}>
            <IconLogout size={16} /> Sair da conta
          </span>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <section className="conteudo">

        {/* TOPBAR */}
        <section className="topbar">
          <div className="topbar-left">
            <p className="greeting">Bem-vindo de volta,</p>
            <h1 className="username">filipe monteiro</h1>
          </div>
          <div className="topbar-right">
            <div className="topbar-icon">
              <IconShoppingCart size={18} />
            </div>
            <div className="avatar">FM</div>
          </div>
        </section>

        {/* HERO */}
        <section className="hero">
          <div className="hero-texto">
            <span className="hero-label">NOVIDADES</span>
            <h2>Semana especial Lava Mais!</h2>
            <p>Cupons exclusivos, promoções imperdíveis e novidades para você. Aproveite antes que acabe!</p>
          </div>
          <div className="hero-icone">
            <IconSpeakerphone size={80} />
          </div>
        </section>

        {/* DESTAQUES */}
        <p className="section-label">Destaques do mês</p>
        <section className="destaques-row">
          <div className="destaque-card dc-purple">
            <IconTicket size={30} className="dc-icone" />
            <div>
              <p className="dc-titulo">3 cupons ativos</p>
              <p className="dc-sub">Disponíveis para usar agora</p>
            </div>
          </div>
          <div className="destaque-card dc-teal">
            <IconRosetteDiscount size={30} className="dc-icone" />
            <div>
              <p className="dc-titulo">Até 20% de desconto</p>
              <p className="dc-sub">Em lavagens do mês de junho</p>
            </div>
          </div>
          <div className="destaque-card dc-amber">
            <IconStar size={30} className="dc-icone" />
            <div>
              <p className="dc-titulo">Novo serviço disponível</p>
              <p className="dc-sub">Lavagem a seco lançada</p>
            </div>
          </div>
        </section>

        {/* ABAS */}
        <section className="abas">
          {abas.map((aba) => (
            <button
              key={aba.key}
              className={`aba ${abaAtiva === aba.key ? "ativa" : ""}`}
              onClick={() => setAbaAtiva(aba.key)}
            >
              {aba.Icone && <aba.Icone size={14} />}
              {aba.label}
            </button>
          ))}
        </section>

        {/* CARDS */}
        <p className="section-label">Todas as ofertas</p>
        <section className="cards-grid">
          {filtrados.map((card) => {
            const { Icone, RodapeIcone, TagIcone } = card;
            return (
              <div key={card.id} className={`card card-${card.cor}`}>
                <div className={`card-stripe stripe-${card.cor}`} />

                <div className="card-head">
                  <div className={`card-icone ci-${card.cor}`}>
                    <Icone size={22} color="white" />
                  </div>
                  <span className={`badge b-${card.cat}`}>{card.badge}</span>
                </div>

                <h3 className="card-titulo">{card.titulo}</h3>
                <p className="card-desc">{card.desc}</p>

                {card.cupom && (
                  <div className="cupom-box">
                    <div className="cupom-esquerda">
                      <IconTag size={16} color="var(--purple-dark)" />
                      <span className="cupom-code">{card.cupom}</span>
                    </div>
                    <button className="btn-copiar" onClick={(e) => copiar(card.cupom, e)}>
                      Copiar
                    </button>
                  </div>
                )}

                {card.destaque && (
                  <>
                    <p className="destaque-num">{card.destaque}</p>
                    <p className="destaque-sub">{card.destaqueLabel}</p>
                  </>
                )}

                {card.progresso !== undefined && (
                  <div className="progress-wrap">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${card.progresso}%` }} />
                    </div>
                    <p className="progress-label">{card.progressoLabel}</p>
                  </div>
                )}

                {card.tag && TagIcone && (
                  <span className={`new-tag tag-${card.cor}`}>
                    <TagIcone size={14} />
                    {card.tag}
                  </span>
                )}

                <div className="card-rodape">
                  <span className="card-data">
                    {RodapeIcone && <RodapeIcone size={12} />}
                    {card.rodape}
                  </span>
                  <button className="btn-ver">
                    Ver mais <IconArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </section>

      </section>
    </main>
  );
};

export default Novidades;