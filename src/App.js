import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import MeuPerfil from './pages/meuPerfil/MeuPerfil';
import DicasFinaceiras from './pages/dicasFinanceiras/DicasFinanceiras';
import Ajuda from './pages/ajuda/Ajuda';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<MeuPerfil />} />
          <Route path="/dicas" element={<DicasFinaceiras />} />
          <Route path="/ajuda" element={<Ajuda />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
