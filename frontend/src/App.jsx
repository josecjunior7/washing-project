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
import Novidades from './pages/Novidades'; 

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const isAdmin = usuario?.role === 'ADMIN';

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
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />

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

        {/* NOVIDADES */}
        <Route
          path="/novidades"
          element={isAuthenticated ? <Novidades /> : <Navigate to="/login" />}
        />

        {/* ADMIN - DASHBOARD */}
        <Route
          path="/admin"
          element={isAuthenticated && isAdmin ? <Admin /> : <Navigate to="/login" />}
        />

        {/* ADMIN - AGENDAMENTOS */}
        <Route
          path="/agendamento-admin"
          element={isAuthenticated && isAdmin ? <AgendamentoAdmin /> : <Navigate to="/login" />}
        />

        {/* ADMIN - MÁQUINAS */}
        <Route
          path="/admin/maquinas"
          element={isAuthenticated && isAdmin ? <AdminMaquinas /> : <Navigate to="/login" />}
        />

        {/* ADMIN - CONFIGURAÇÕES */}
        <Route
          path="/admin/configuracoes"
          element={isAuthenticated && isAdmin ? <AdminConfiguracoes /> : <Navigate to="/login" />}
        />

        {/* ROTA INVÁLIDA */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;