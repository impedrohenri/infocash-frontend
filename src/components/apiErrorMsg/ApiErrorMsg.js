import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ApiErrorMsg(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Erro {props.status} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='fs-5 fw-medium'>Não foi possível carregar todos os dados do servidor.</p>
            <span>Alguns recursos podem estar indisponíveis.</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApiErrorMsg;