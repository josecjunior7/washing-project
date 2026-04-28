import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';  // ← ADICIONE ESTA LINHA
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';

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

        {/* TELA DE CADASTRO - ADICIONADA */}
        <Route path="/cadastro" element={<Cadastro />} />

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