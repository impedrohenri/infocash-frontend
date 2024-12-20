import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import LOGO from '../../img/vasalirelsol.png';

export default function Header(props) {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={LOGO} alt="Logo" width="30" height="30" className={`align-text-top me-2 ${styles.logoHeader}`} />
          Vinanças
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/perfil" className="nav-link">Meu Perfil</Link>
            </li>
            <li className="nav-item">
              <Link to="/dicas" className="nav-link">Dicas Financeiras</Link>
            </li>
            <li className="nav-item">
              <Link to="/ajuda" className="nav-link">Ajuda</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

