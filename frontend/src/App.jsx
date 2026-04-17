import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Dashboard';

// IMPORTAR AS PÁGINAS DENTRO DA PASTA DentroDosCards
import Agendamento from './pages/DentroDosCards/Agendamento';
import HistoricoAgendamento from './pages/DentroDosCards/HistoricoAgendamento';
import HistoricoPagamento from './pages/DentroDosCards/HistoricoPagamento';
import Status from './pages/DentroDosCards/Status';
import Suporte from './pages/DentroDosCards/Suporte';
import Funcionamento from './pages/DentroDosCards/Funcionamento';
import Novidades from './pages/DentroDosCards/Novidades';

function App() {
  // Verifica se o usuário está logado
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      <Routes>
        {/* PÁGINA PÚBLICA - informações da empresa */}
        <Route path="/" element={<Home />} />
        
        {/* TELA DE LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD - SÓ ACESSA SE ESTIVER LOGADO */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* PÁGINAS DOS CARDS */}
        <Route path="/agendamento" element={isAuthenticated ? <Agendamento /> : <Navigate to="/login" />} />
        <Route path="/historico-agendamento" element={isAuthenticated ? <HistoricoAgendamento /> : <Navigate to="/login" />} />
        <Route path="/historico-pagamento" element={isAuthenticated ? <HistoricoPagamento /> : <Navigate to="/login" />} />
        <Route path="/status" element={isAuthenticated ? <Status /> : <Navigate to="/login" />} />
        <Route path="/suporte" element={isAuthenticated ? <Suporte /> : <Navigate to="/login" />} />
        <Route path="/funcionamento" element={isAuthenticated ? <Funcionamento /> : <Navigate to="/login" />} />
        <Route path="/novidades" element={isAuthenticated ? <Novidades /> : <Navigate to="/login" />} />

        {/* Redireciona qualquer rota errada para HOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;