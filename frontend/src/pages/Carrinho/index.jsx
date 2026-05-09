import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaShoppingCart, FaCreditCard, FaBars, FaCalendarDay, FaRegClock, FaTshirt } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "./Carrinho.css";

function Carrinho() {
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && user.nome) {
      setNomeUsuario(user.nome);
    }
    
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

  const atualizarQuantidade = (index, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    const novosItens = [...itensCarrinho];
    novosItens[index].quantidade = novaQuantidade;
    setItensCarrinho(novosItens);
    calcularTotal(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const removerItem = (index) => {
    const novosItens = itensCarrinho.filter((_, i) => i !== index);
    setItensCarrinho(novosItens);
    calcularTotal(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
    setTotalCarrinho(0);
    localStorage.removeItem('carrinho');
  };

  const finalizarPedido = () => {
    if (itensCarrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    navigate('/finalizar-compra');
  };

  const voltarParaHome = () => {
    navigate('/home');
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
            <button className="btn-voltar-carrinho" onClick={voltarParaHome}>
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
          <div className="carrinho-container">
            <div className="carrinho-card">
              <div className="carrinho-header">
                <h2><FaShoppingCart /> Meu Carrinho</h2>
                <p>Revise seus itens antes de finalizar</p>
              </div>

              {itensCarrinho.length === 0 ? (
                <div className="carrinho-vazio">
                  <FaShoppingCart className="icone-vazio" />
                  <p>Seu carrinho está vazio</p>
                  <button className="btn-agendar" onClick={() => navigate('/agendamento')}>
                    Fazer Agendamento
                  </button>
                </div>
              ) : (
                <>
                  <div className="carrinho-itens">
                    {itensCarrinho.map((item, index) => (
                      <div key={index} className="carrinho-item">
                        <div className="item-info">
                          <h4>{item.nome}</h4>
                          <p>{item.descricao}</p>
                          <div className="item-detalhes">
                            <span><FaCalendarDay /> {item.data}</span>
                            <span><FaRegClock /> {item.horario}</span>
                            <span><FaTshirt /> {item.maquina}</span>
                          </div>
                          <div className="item-preco">R$ {item.preco.toFixed(2)}</div>
                        </div>
                        <div className="item-actions">
                          <div className="quantidade-control">
                            <button onClick={() => atualizarQuantidade(index, (item.quantidade || 1) - 1)}>-</button>
                            <span>{item.quantidade || 1}</span>
                            <button onClick={() => atualizarQuantidade(index, (item.quantidade || 1) + 1)}>+</button>
                          </div>
                          <button className="btn-remover" onClick={() => removerItem(index)}>
                            <FaTrash /> Remover
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="carrinho-footer">
                    <div className="resumo-pedido">
                      <span>Total do pedido</span>
                      <div className="total">
                        <strong>R$ {totalCarrinho.toFixed(2)}</strong>
                      </div>
                    </div>
                    <div className="carrinho-botoes">
                      <button className="btn-limpar" onClick={limparCarrinho}>Limpar Carrinho</button>
                      <button className="btn-finalizar" onClick={finalizarPedido}>
                        <FaCreditCard /> Finalizar Pedido
                      </button>
                    </div>
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

export default Carrinho;