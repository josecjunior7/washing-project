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
import AgendamentoAdmin from './pages/AgendamentoAdmin';
import AdminMaquinas from './pages/AdminMaquinas';
import AdminConfiguracoes from './pages/AdminConfiguracoes';
import AdminNovidades from './pages/AdminNovidades';
import AdminClientes from './pages/AdminClientes';
import Novidades from './pages/Novidades';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuario?.role === 'ADMIN';
  return isAuthenticated && isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* PÁGINA PÚBLICA */}
        <Route path="/" element={<LandingPage />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* CADASTRO */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* HOME */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

        {/* AGENDAMENTO */}
        <Route path="/agendamento" element={<Agendamento />} />

        {/* HISTÓRICO */}
        <Route path="/historico" element={<Historico />} />

        {/* PAGAMENTOS */}
        <Route path="/pagamentos" element={<Pagamentos />} />

        {/* STATUS */}
        <Route path="/status" element={<Status />} />

        {/* CARRINHO */}
        <Route path="/carrinho" element={<Carrinho />} />

        {/* FINALIZAR COMPRA */}
        <Route path="/finalizar-compra" element={<FinalizarCompra />} />

        {/* PERFIL */}
        <Route path="/perfil" element={<Perfil />} />

        {/* NOVIDADES (cliente) */}
        <Route path="/novidades" element={<PrivateRoute><Novidades /></PrivateRoute>} />

        {/* ADMIN - DASHBOARD */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />

        {/* ADMIN - AGENDAMENTOS */}
        <Route path="/agendamento-admin" element={<AdminRoute><AgendamentoAdmin /></AdminRoute>} />

        {/* ADMIN - CLIENTES */}
        <Route path="/admin/clientes" element={<AdminRoute><AdminClientes /></AdminRoute>} />

        {/* ADMIN - MÁQUINAS */}
        <Route path="/admin/maquinas" element={<AdminRoute><AdminMaquinas /></AdminRoute>} />

        {/* ADMIN - NOVIDADES */}
        <Route path="/admin/novidades" element={<AdminRoute><AdminNovidades /></AdminRoute>} />

        {/* ADMIN - CONFIGURAÇÕES */}
        <Route path="/admin/configuracoes" element={<AdminRoute><AdminConfiguracoes /></AdminRoute>} />

        {/* ROTA INVÁLIDA */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;