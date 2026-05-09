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
import Perfil from './pages/Perfil';
import Admin from './pages/Admin';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuario?.role === 'ADMIN';

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
        <Route path="/finalizar-compra" element={<FinalizarCompra />} />

        {/* TELA DE PERFIL */}
        <Route path="/perfil" element={<Perfil />} />

        {/* DASHBOARD - SÓ ACESSA SE ESTIVER LOGADO */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />

        {/* PAINEL ADMIN - SÓ ACESSA SE FOR ADMIN */}
        <Route 
          path="/admin" 
          element={isAuthenticated && isAdmin ? <Admin /> : <Navigate to="/login" />} 
        />

        {/* Redireciona qualquer rota errada para HOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;