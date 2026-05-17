import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaHandHoldingUsd, FaCreditCard, FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./FinalizarCompra.css";

function FinalizarCompra() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState("estabelecimento");
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) setNomeUsuario(user.nome);

    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItensCarrinho(carrinhoSalvo);
    calcularTotal(carrinhoSalvo);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const calcularTotal = (itens) => {
    const soma = itens.reduce((acc, item) => acc + (item.preco * (item.quantidade || 1)), 0);
    setTotalCarrinho(soma);
  };

  const handleConfirmarPagamento = () => {
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    // Salva em pagamentos (tela de Pagamentos)
    const pagamentosExistentes = JSON.parse(localStorage.getItem('pagamentos')) || [];
    const novosPagamentos = itensCarrinho.map((item, index) => ({
      id: Date.now() + index,
      servico: item.nome,
      descricao: item.descricao,
      data: item.data,
      horario: item.horario,
      maquina: item.maquina,
      valor: item.preco,
      status: "pago",
      dataPagamento: dataAtual,
      formaPagamento: "Pagamento no Estabelecimento",
    }));
    localStorage.setItem('pagamentos', JSON.stringify([...pagamentosExistentes, ...novosPagamentos]));

    // Salva em agendamentos (tela de Histórico)
    const historicoExistente = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const novosHistorico = itensCarrinho.map((item, index) => ({
      id: Date.now() + index + 1000,
      nome: item.nome,
      descricao: item.descricao,
      data: item.data,
      horario: item.horario,
      maquina: item.maquina,
      preco: item.preco,
      dataCriacao: dataAtual,
    }));
    localStorage.setItem('agendamentos', JSON.stringify([...historicoExistente, ...novosHistorico]));

    // Limpa carrinho
    localStorage.removeItem('carrinho');

    setPagamentoConfirmado(true);
    setTimeout(() => navigate('/pagamentos'), 2000);
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
            <button className="btn-voltar-finalizar" onClick={() => navigate('/carrinho')}>
              <FaArrowLeft /> Voltar
            </button>
            <section className="welcome-text">
              <span>Bem-vindo de volta,</span>
              <h2 className="user">{nomeUsuario}</h2>
            </section>
          </section>
          <section className="avatar-circle">
            {nomeUsuario ? nomeUsuario.charAt(0) : "C"}
          </section>
        </header>

        <section className="home-body">
          <div className="pagamento-container">
            <div className="pagamento-card">
              {pagamentoConfirmado ? (
                <div className="confirmado-card">
                  <FaCheckCircle className="icone-confirmado" />
                  <h2>Agendamento Confirmado!</h2>
                  <p>Seu agendamento foi realizado com sucesso.</p>
                  <p>Redirecionando para a tela de pagamentos...</p>
                </div>
              ) : (
                <>
                  <div className="pagamento-header">
                    <h2><FaCreditCard /> Finalizar Pedido</h2>
                  </div>

                  <div className="resumo-pedido-pagamento">
                    <h3>Resumo do Pedido</h3>
                    <div className="itens-pagamento">
                      {itensCarrinho.map((item, index) => (
                        <div key={index} className="item-pagamento">
                          <div className="item-pagamento-info">
                            <h4>{item.nome}</h4>
                            <p>{item.descricao}</p>
                            <div className="item-pagamento-detalhes">
                              <span>{item.data}</span>
                              <span>{item.horario}</span>
                              <span>{item.maquina}</span>
                            </div>
                          </div>
                          <div className="item-pagamento-preco">
                            <strong>R$ {item.preco.toFixed(2)}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="total-pagamento">
                      <span>Total do pedido:</span>
                      <strong>R$ {totalCarrinho.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="formas-pagamento">
                    <h3>Forma de pagamento</h3>
                    <div className="opcao-pagamento selecionada">
                      <FaHandHoldingUsd className="opcao-icon" />
                      <div className="opcao-info">
                        <h4>Pagar no Estabelecimento</h4>
                        <p>Pagamento na loja com Crédito, Débito ou PIX</p>
                      </div>
                      <FaCheckCircle className="opcao-check" />
                    </div>
                  </div>

                  <div className="pagamento-footer">
                    <div className="total-final">
                      <span>Total a pagar:</span>
                      <strong>R$ {totalCarrinho.toFixed(2)}</strong>
                    </div>
                    <button className="btn-finalizar-pagamento" onClick={handleConfirmarPagamento}>
                      <FaCheckCircle /> Confirmar Agendamento
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

export default FinalizarCompra;