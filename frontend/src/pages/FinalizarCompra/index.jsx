import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaQrcode, FaHandHoldingUsd, FaCreditCard } from "react-icons/fa";
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
    
    // Salvar os itens como pagamentos realizados
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
      dataPagamento: new Date().toLocaleDateString('pt-BR'),
      formaPagamento: formaPagamento === "pix_online" ? "PIX" : "Pagamento no Estabelecimento"
    }));
    
    const todosPagamentos = [...pagamentosExistentes, ...novosPagamentos];
    localStorage.setItem('pagamentos', JSON.stringify(todosPagamentos));
    
    // Remover itens do carrinho
    localStorage.removeItem('carrinho');
    
    setPagamentoConfirmado(true);
    
    setTimeout(() => {
      navigate('/pagamentos');
    }, 2000);
  };

  return (
    <div className="finalizar-page">
      <div className="finalizar-container">
        <div className="finalizar-header">
          <button className="btn-back" onClick={() => navigate('/carrinho')}>
            <FaArrowLeft /> Voltar
          </button>
          <h1><FaCreditCard /> Finalizar Pedido</h1>
        </div>

        {pagamentoConfirmado ? (
          <div className="confirmado-card">
            <FaCheckCircle className="icone-confirmado" />
            <h2>Pagamento Confirmado!</h2>
            <p>Seu pagamento foi realizado com sucesso.</p>
            <p>Redirecionando para a tela de pagamentos...</p>
          </div>
        ) : (
          <>
            <div className="resumo-pedido">
              <h3>Resumo do Pedido</h3>
              <div className="itens-lista">
                {itensCarrinho.map((item, index) => (
                  <div key={index} className="item-resumo">
                    <div className="item-info">
                      <h4>{item.nome}</h4>
                      <p>{item.descricao}</p>
                      <div className="item-detalhes">
                        <span>{item.data}</span>
                        <span>{item.horario}</span>
                        <span>{item.maquina}</span>
                      </div>
                    </div>
                    <div className="item-preco">
                      <strong>R$ {item.preco.toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total-resumo">
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
                    <h4>PIX</h4>
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

            <div className="finalizar-footer">
              <div className="total-final">
                <span>Total a pagar:</span>
                <strong>R$ {totalCarrinho.toFixed(2)}</strong>
              </div>
              <button className="btn-finalizar" onClick={handleFinalizarPagamento}>
                <FaCheckCircle /> Confirmar Pagamento
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FinalizarCompra;