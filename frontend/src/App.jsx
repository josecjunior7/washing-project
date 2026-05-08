import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Agendamento from './pages/Agendamento';
import Historico from './pages/Historico';
import Pagamentos from './pages/Pagamentos';
import Status from './pages/Status';
import Carrinho from './pages/Carrinho';
import FinalizarCompra from './pages/FinalizarCompra';

function App() {
  // Verifica se o usuário está logado
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      <Routes>
        {/* PÁGINA PÚBLICA - informações da empresa */}
        <Route path="/" element={<LandingPage />} />
        
        {/* TELA DE LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* TELA DE CADASTRO */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* TELA DE AGENDAMENTO */}
        <Route path="/agendamento" element={<Agendamento />} />

        {/* TELA DE HISTÓRICO */}
        <Route path="/historico" element={<Historico />} />

        {/* TELA DE PAGAMENTOS (Faturas e Recibos) */}
        <Route path="/pagamentos" element={<Pagamentos />} />

        {/* TELA DE STATUS */}
        <Route path="/status" element={<Status />} />

        {/* TELA DO CARRINHO */}
        <Route path="/carrinho" element={<Carrinho />} />

        {/* TELA DE FinalizarCompra (Finalizar Pedido) */}
        <Route path="/FinalizarCompra" element={<FinalizarCompra />} />

        {/* DASHBOARD - SÓ ACESSA SE ESTIVER LOGADO */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />

        {/* Redireciona qualquer rota errada para HOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;