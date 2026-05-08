import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import "./Carrinho.css";

function Carrinho() {
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItensCarrinho(carrinhoSalvo);
    calcularTotal(carrinhoSalvo);
  }, []);

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
    navigate('/pagamento');
  };

  return (
    <div className="carrinho-page">
      <div className="carrinho-container">
        <div className="carrinho-header">
          <button className="btn-back" onClick={() => navigate('/home')}>
            <FaArrowLeft /> Voltar
          </button>
          <h1><FaShoppingCart /> Meu Carrinho</h1>
        </div>

        {itensCarrinho.length === 0 ? (
          <div className="carrinho-vazio">
            <FaShoppingCart className="icone-vazio" />
            <p>Seu carrinho está vazio</p>
            <button className="btn-continuar" onClick={() => navigate('/agendamento')}>
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
                      <span>📅 {item.data}</span>
                      <span>⏰ {item.horario}</span>
                      <span>🧺 {item.maquina}</span>
                    </div>
                    <span className="item-preco">R$ {item.preco.toFixed(2)}</span>
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
  );
}

export default Carrinho;