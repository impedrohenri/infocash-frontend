import { Button, Modal } from 'react-bootstrap';
import FormRegistro from '../forms/formRegistro/FormRegistro';
import styles from './ModalTrasacao.module.css'
import { useState } from 'react';
import SubmitButton from '../forms/submitButton/SubmitButton';
import API from '../../routes/api';


export default function ModalTrasacao({ setReloadAPI, reloadAPI }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"]


	const handleSubmit = (evento) => {

		evento.preventDefault();
		const formulario = document.getElementById("formularioRegistros")
		const formData = new FormData(formulario)
		const data = Object.fromEntries(formData)

		fetch(API + `/registro/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)

		})
			.then(() => {
				formulario.reset();
				setReloadAPI(!reloadAPI)
			}
			)
	}

	return (
		<>
			<div className='mt-4 pt-4 ps-0 '>
				<Button variant="secondary" onClick={handleShow} className='d-flex align-items-center p-2 px-3 '>
					<img src='/img/icons/add_icon.png' height={25} className='me-2' alt=''/> Registro
				</Button>
			</div>

			<Modal className={`${styles.modal1}`} id="modalTransacao" show={show} onHide={handleClose} scrollable={true}>

				<Modal.Header closeButton>
					<Modal.Title>Adicionar Registro</Modal.Title>
				</Modal.Header>

				{/* FORMULÁRIO DE TRANSAÇÃO */}
				<FormRegistro id='formularioRegistros' onSubmit={handleSubmit} />

				<Modal.Footer>
					<SubmitButton form='formularioRegistros' value='Cadastrar' />
				</Modal.Footer>

			</Modal>
		</>
	)
}