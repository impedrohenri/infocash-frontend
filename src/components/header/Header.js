
import styles from './Header.module.css';
import { Link } from 'react-router-dom';



export default function Header(props) {

  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary ${styles.navbar}`} data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand d-flex ">
        <img src='../../img/infocash-brand/svg/infocash-logo-white.svg' alt="Logo" width="30" height="30" className="align-text-top mx-2" />
        <img src='../../img/infocash-brand/svg/infocash-name-white.svg' alt="Logo" height="20" className='align-text-top me-2 my-auto' />
          
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
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

