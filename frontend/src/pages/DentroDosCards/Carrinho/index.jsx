import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import './Carrinho.css';
import cardLavagem1 from "../../../assets/images/card_lav.png";
import cardLavagem2 from "../../../assets/images/card_machine.png";

function Carrinho() {
  const navigate = useNavigate();

  // Serviços disponíveis no carrinho (COM IMAGENS)
  const [itens, setItens] = useState([
    { 
      id: 1, 
      nome: "Lavagem Completa", 
      descricao: "Serviço: Lavagem + Secagem + Atendimento",
      quantidade: 1, 
      preco: 89.90,
      imagem: cardLavagem1,
      alt: "Lavagem Completa"
    },
    { 
      id: 2, 
      nome: "Lavagem/Secagem", 
      descricao: "Serviço: Lavagem ou Secagem + Atendimento",
      quantidade: 1, 
      preco: 54.90,
      imagem: cardLavagem2,
      alt: "Lavagem/Secagem"
    }
  ]);

  // Calcular total
  const total = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  // Remover item
  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  // Aumentar quantidade
  const aumentarQtd = (id) => {
    setItens(itens.map(item => 
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    ));
  };

  // Diminuir quantidade
  const diminuirQtd = (id) => {
    setItens(itens.map(item => 
      item.id === id && item.quantidade > 1 ? { ...item, quantidade: item.quantidade - 1 } : item
    ));
  };

  // Salvar dados do carrinho e ir para pagamento
  const irParaPagamento = () => {
    const dadosPedido = {
      itens: itens,
      total: total,
      data: new Date().toISOString()
    };
    
    localStorage.setItem('pedidoAtual', JSON.stringify(dadosPedido));
    navigate('/pagamento');
  };

  return (
    <div className="carrinho-container">
      
      <button className="btn-voltar" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Voltar ao Dashboard
      </button>

      <div className="carrinho-content">
        <h1 className="carrinho-title">
          <FaShoppingCart /> SEU CARRINHO
        </h1>

        {itens.length === 0 ? (
          <div className="carrinho-vazio">
            <p>🛒 Seu carrinho está vazio</p>
            <button className="btn-comprar" onClick={() => navigate('/dashboard')}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="itens-lista">
              {itens.map(item => (
                <div key={item.id} className="item-carrinho">
                  <div className="item-imagem">
                    <img 
                      src={item.imagem} 
                      alt={item.alt}
                      className="item-img"
                    />
                  </div>
                  <div className="item-info">
                    <h3>{item.nome}</h3>
                    <p className="item-descricao">{item.descricao}</p>
                    <p className="item-preco">R$ {item.preco.toFixed(2)}</p>
                  </div>
                  <div className="item-controles">
                    <button className="btn-qtd" onClick={() => diminuirQtd(item.id)}>
                      <FaMinus />
                    </button>
                    <span className="item-qtd">{item.quantidade}</span>
                    <button className="btn-qtd" onClick={() => aumentarQtd(item.id)}>
                      <FaPlus />
                    </button>
                    <button className="btn-remover" onClick={() => removerItem(item.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrinho-resumo">
              <div className="resumo-linha">
                <span>Subtotal:</span>
                <strong>R$ {total.toFixed(2)}</strong>
              </div>
              <div className="resumo-linha total">
                <span>Total:</span>
                <strong>R$ {total.toFixed(2)}</strong>
              </div>
              <button className="btn-finalizar" onClick={irParaPagamento}>
                <FaShoppingCart /> Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Carrinho;