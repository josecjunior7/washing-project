import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaQrcode, FaHandHoldingUsd, FaCreditCard, FaCalendarDay, FaRegClock, FaTshirt } from "react-icons/fa";
import "./FinalizarCompra.css";

function FinalizarCompra() {
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setItensCarrinho(carrinhoSalvo);
    calcularTotal(carrinhoSalvo);
  }, []);

  const calcularTotal = (itens) => {
    const soma = itens.reduce((acc, item) => acc + (item.preco * (item.quantidade || 1)), 0);
    setTotalCarrinho(soma);
  };

  const handleFinalizarPagamento = () => {
    if (!formaPagamento) {
      alert("Selecione uma forma de pagamento!");
      return;
    }
    setPagamentoConfirmado(true);
    
    setTimeout(() => {
      localStorage.removeItem('carrinho');
      alert("Pedido finalizado com sucesso!");
      navigate('/home');
    }, 2000);
  };

  return (
    <section className="finalizar-layout">
      <main className="finalizar-content">
        <header className="finalizar-header">
          <button className="btn-voltar" onClick={() => navigate('/carrinho')}>
            <FaArrowLeft /> Voltar
          </button>
          <h2>Finalizar Pedido</h2>
        </header>

        <section className="finalizar-body">
          <div className="pagamento-container">
            <div className="pagamento-card">
              {pagamentoConfirmado ? (
                <div className="confirmado-card">
                  <FaCheckCircle className="icone-confirmado" />
                  <h2>Pedido Confirmado!</h2>
                  <p>Seu pedido foi realizado com sucesso.</p>
                  <button className="btn-voltar-home" onClick={() => navigate('/home')}>
                    Voltar para Home
                  </button>
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
                    <h3>Escolha a forma de pagamento</h3>
                    <div className="opcoes-pagamento">
                      <div className={`opcao-pagamento ${formaPagamento === 'pix_online' ? 'selecionada' : ''}`} onClick={() => setFormaPagamento('pix_online')}>
                        <FaQrcode className="opcao-icon" />
                        <div className="opcao-info">
                          <h4>PIX Online</h4>
                          <p>Pagamento instantâneo via QR Code</p>
                        </div>
                        {formaPagamento === 'pix_online' && <FaCheckCircle className="opcao-check" />}
                      </div>

                      <div className={`opcao-pagamento ${formaPagamento === 'estabelecimento' ? 'selecionada' : ''}`} onClick={() => setFormaPagamento('estabelecimento')}>
                        <FaHandHoldingUsd className="opcao-icon" />
                        <div className="opcao-info">
                          <h4>Pagar no Estabelecimento</h4>
                          <p>Pagamento na loja com Crédito, Débito ou PIX</p>
                        </div>
                        {formaPagamento === 'estabelecimento' && <FaCheckCircle className="opcao-check" />}
                      </div>
                    </div>
                  </div>

                  <div className="pagamento-footer">
                    <div className="total-final">
                      <span>Total a pagar:</span>
                      <strong>R$ {totalCarrinho.toFixed(2)}</strong>
                    </div>
                    <button className="btn-finalizar-pagamento" onClick={handleFinalizarPagamento}>
                      <FaCheckCircle /> Finalizar Pedido
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