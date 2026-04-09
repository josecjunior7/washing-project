import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';        // ← MUDE PARA Home
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* PÁGINA PÚBLICA - informações da empresa */}
        <Route path="/" element={<Home />} />     {/* ← MUDE PARA Home */}
        
        {/* TELA DE LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD - área administrativa (pós-login) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redireciona qualquer rota errada para HOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;