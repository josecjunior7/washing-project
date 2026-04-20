import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaQrcode, FaCreditCard, FaMoneyBill, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import './Pagamento.css';
import logo from '../../../assets/images/logo-test.png';

function Pagamento() {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [metodoSelecionado, setMetodoSelecionado] = useState(null);

  useEffect(() => {
    const pedidoSalvo = localStorage.getItem('pedidoAtual');
    if (pedidoSalvo) {
      setPedido(JSON.parse(pedidoSalvo));
    } else {
      navigate('/carrinho');
    }
  }, [navigate]);

  const handleConfirmarPagamento = () => {
    if (!metodoSelecionado) {
      alert('Por favor, selecione uma forma de pagamento');
      return;
    }

    const pagamentoCompleto = {
      ...pedido,
      metodoPagamento: metodoSelecionado,
      status: 'Pago',
      dataPagamento: new Date().toLocaleString()
    };

    localStorage.setItem('pagamentoRealizado', JSON.stringify(pagamentoCompleto));
    localStorage.removeItem('pedidoAtual');

    alert(`✅ Pagamento confirmado com ${metodoSelecionado}!\nTotal: R$ ${pedido?.total.toFixed(2)}\n\nSeu pedido foi registrado.`);
    navigate('/dashboard');
  };

  if (!pedido) {
    return (
      <div className="pagamento-loading">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="pagamento-page">
      <div className="pagamento-container">
        
        {/* Header com logo e título */}
        <div className="pagamento-header">
          <button className="btn-back" onClick={() => navigate('/carrinho')}>
            <FaArrowLeft /> Voltar
          </button>
          <img src={logo} alt="LavaMais" className="logo-pagamento" />
          <h1>Escolha a forma de pagamento</h1>
          <p className="subtitle">Selecione a melhor opção para você</p>
        </div>

        {/* Resumo do pedido */}
        <div className="resumo-pedido-card">
          <h3>Resumo do pedido</h3>
          <div className="resumo-itens">
            {pedido.itens.map((item, index) => (
              <div key={index} className="resumo-item">
                <span>{item.nome} x{item.quantidade}</span>
                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="resumo-total">
            <strong>Total</strong>
            <strong>R$ {pedido.total.toFixed(2)}</strong>
          </div>
        </div>

        {/* Opções de pagamento estilo cards */}
        <div className="opcoes-pagamento">
          <div 
            className={`pagamento-card-opcao ${metodoSelecionado === 'PIX' ? 'selected' : ''}`}
            onClick={() => setMetodoSelecionado('PIX')}
          >
            <div className="card-icon pix-icon">
              <FaQrcode />
            </div>
            <div className="card-info">
              <h3>PIX</h3>
              <p>Pagamento instantâneo via QR Code</p>
              <span className="tag">✓ Imediato</span>
            </div>
            {metodoSelecionado === 'PIX' && <FaCheckCircle className="check-icon" />}
          </div>

          <div 
            className={`pagamento-card-opcao ${metodoSelecionado === 'CRÉDITO' ? 'selected' : ''}`}
            onClick={() => setMetodoSelecionado('CRÉDITO')}
          >
            <div className="card-icon credito-icon">
              <FaCreditCard />
            </div>
            <div className="card-info">
              <h3>Cartão de Crédito</h3>
              <p>Pague em até 12x</p>
              <span className="tag">✓ Parcelamento</span>
            </div>
            {metodoSelecionado === 'CRÉDITO' && <FaCheckCircle className="check-icon" />}
          </div>

          <div 
            className={`pagamento-card-opcao ${metodoSelecionado === 'DÉBITO' ? 'selected' : ''}`}
            onClick={() => setMetodoSelecionado('DÉBITO')}
          >
            <div className="card-icon debito-icon">
              <FaMoneyBill />
            </div>
            <div className="card-info">
              <h3>Cartão de Débito</h3>
              <p>Pagamento à vista</p>
              <span className="tag">✓ Sem juros</span>
            </div>
            {metodoSelecionado === 'DÉBITO' && <FaCheckCircle className="check-icon" />}
          </div>
        </div>

        {/* Botão de confirmação */}
        <button 
          className="btn-confirmar"
          onClick={handleConfirmarPagamento}
        >
          Confirmar pagamento
        </button>

        {/* Footer */}
        <div className="pagamento-footer">
          <div className="whatsapp-contato">
            <FaWhatsapp />
            <span>Precisa de ajuda? Fale conosco</span>
          </div>
          <p className="marca">LavaMais - Lavanderia Autoserviço</p>
        </div>
      </div>
    </div>
  );
}

export default Pagamento;