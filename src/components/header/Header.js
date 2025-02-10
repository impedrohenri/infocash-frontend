import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function Header(props) {
  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${styles.navbar}`}
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className="d-flex">
          <img src="../../img/infocash-brand/svg/infocash-logo-white.svg" alt="Logo" width="30" height="30"
            className="align-text-top mx-2" />
          <img src="../../img/infocash-brand/svg/infocash-name-white.svg" alt="Logo" height="20" className="align-text-top me-2 my-auto"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              Meu Perfil
            </Nav.Link>
            <Nav.Link as={Link} to="/dicas">
              Dicas Financeiras
            </Nav.Link>
            <Nav.Link as={Link} to="/ajuda">
              Ajuda
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
