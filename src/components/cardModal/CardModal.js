import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SubmitButton from '../forms/submitButton/SubmitButton';
import FormRegistro from '../forms/formRegistro/FormRegistro';

export default function CardModal(props) {
    const id_registro = props.id

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const EditBody = ({id}) => {

        const handleEdit = (event) => {
            const formulario = document.getElementById("formEditRegistro")
    		event.preventDefault();
 		    const formData = new FormData(formulario)
 		    const data = Object.fromEntries(formData)


            fetch(`http://localhost:3005/api/registro/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        }

        return (
        <>
            <FormRegistro onSubmit={handleEdit} id='formEditRegistro'/>
            <Modal.Footer>
                <SubmitButton value='Editar' onClick={handleEdit} />
            </Modal.Footer>
        </>
        )
    }

    // Corpo do modal delete
    const DeleteBody = ({ id }) => {

        const handleDelete = () => {
            fetch(`http://localhost:3005/api/registro/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

        }

        return (
            <>
                <Modal.Body>
                    <p className='fs-5'>Tem certeza que deseja deletar o registro?</p>
                    <p className='text-danger'>Essa ação não pode ser desfeita.</p>
                </Modal.Body>
                <Modal.Footer>
                    <SubmitButton value='Deletar' onClick={handleDelete} />
                </Modal.Footer>
            </>
        )
    }



    return (
        <>
            <button className='btn d-flex gap-3 align-items-center w-100' onClick={handleShow}>
                <img src={props.src} height={20} /> {props.text}
            </button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.text} registro {props.id}</Modal.Title>
                </Modal.Header>

                {
                    props.text === 'Editar' ?
                        (<EditBody id={id_registro} />) :
                        (<DeleteBody id={id_registro} />)
                }

            </Modal>
        </>
    );
}