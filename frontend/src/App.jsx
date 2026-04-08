import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial é o Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota da Home */}
        <Route path="/home" element={<Home />} />

        {/* Redireciona qualquer rota errada para o login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;