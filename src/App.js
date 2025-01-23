import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import MeuPerfil from './pages/meuPerfil/MeuPerfil';
import DicasFinaceiras from './pages/dicasFinanceiras/DicasFinanceiras';
import Ajuda from './pages/ajuda/Ajuda';
import RecuperarSenha from './pages/recuperarSenha/RecuperarSenha';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path='/recuperar-senha' element={<RecuperarSenha />} />

          <Route path='/home' element={<PrivateRoute/>}>
            <Route path='/home' element={<Home />} />
          </Route>

           <Route path='/perfil' element={<PrivateRoute/>}>
            <Route path='/perfil' element={<MeuPerfil/>}/>
          </Route>
          
          <Route path='/dicas' element={<PrivateRoute/>}>
            <Route index element={<DicasFinaceiras/>}/>
          </Route>
          
          <Route path='/ajuda' element={<PrivateRoute/>}>
            <Route index element={<Ajuda/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;