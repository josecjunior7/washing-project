import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import AdminFinanceiro from './pages/AdminFinanceiro';
import Novidades from './pages/Novidades';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/agendamento" element={<PrivateRoute><Agendamento /></PrivateRoute>} />
        <Route path="/historico" element={<PrivateRoute><Historico /></PrivateRoute>} />
        <Route path="/pagamentos" element={<PrivateRoute><Pagamentos /></PrivateRoute>} />
        <Route path="/status" element={<PrivateRoute><Status /></PrivateRoute>} />
        <Route path="/carrinho" element={<PrivateRoute><Carrinho /></PrivateRoute>} />
        <Route path="/finalizar-compra" element={<PrivateRoute><FinalizarCompra /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/novidades" element={<PrivateRoute><Novidades /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/admin/agendamentos" element={<AdminRoute><AgendamentoAdmin /></AdminRoute>} />
        <Route path="/admin/clientes" element={<AdminRoute><AdminClientes /></AdminRoute>} />
        <Route path="/admin/maquinas" element={<AdminRoute><AdminMaquinas /></AdminRoute>} />
        <Route path="/admin/novidades" element={<AdminRoute><AdminNovidades /></AdminRoute>} />
        <Route path="/admin/financeiro" element={<AdminRoute><AdminFinanceiro /></AdminRoute>} />
        <Route path="/admin/configuracoes" element={<AdminRoute><AdminConfiguracoes /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;