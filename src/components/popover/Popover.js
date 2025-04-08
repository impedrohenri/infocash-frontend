import styles from './Popover.module.css'
import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import API from '../../routes/api';

export default function Popover({setLimiteMensal}) {
    
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const overlayRef = useRef(null);
    const id = JSON.parse(localStorage.getItem('@Auth:user'))

    // FECHA O POPOVER AO CLICAR FORA
    const handleOutsideClick = (event) => {
        if (
            overlayRef.current &&
            !overlayRef.current.contains(event.target) &&
            !target.current.contains(event.target)
        ) {
            setShow(false);
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [show]);



    // EXECUTA AO SUBMETER O FORM DO POPOVER
    
    const handleSubmit = (evento) => {
        const formulario = document.getElementById("formularioLimite")
        evento.preventDefault()
        const formData = new FormData(formulario)
        const data = Object.fromEntries(formData)
        console.log(data)

        fetch(API + `/conta/meta/${id["id_usuario"]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => {setLimiteMensal(data['meta']);
            
            formulario.reset()})
            
            
    }

    return (
        <>
            <Button ref={target} className={`${styles.botao}`} onClick={() => setShow(!show)}>
                <img src='../../img/infocash-brand/svg/infocash-logo-black.svg' alt='' />
            </Button>
            <Overlay target={target.current} show={show} placement="left" ref={overlayRef}>
                {(props) => (
                    <Tooltip className={`${styles.overlay}`} id="overlay-example" {...props}>
                        <form id='formularioLimite' onSubmit={handleSubmit}>
                            <span className='fs-5'> Definir meu limite mensal</span>
                            <div className="form-floating mb-3 ">
                                <input type="number" name='meta' className="form-control fs-5 my-2" placeholder='R$' step={0.01} min={0} required />
                                <label htmlFor="floatingInput">R$</label>
                            </div>
                            <button type='submit' className='btn'>Confirmar</button>
                        </form>
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
}