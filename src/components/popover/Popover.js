import styles from './Popover.module.css'
import changeIcon from '../../img/infocash-brand/png/infocash-coin-black.png'
import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export default function Popover({setLimiteMensal}) {
    
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const overlayRef = useRef(null);

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
    const formulario = document.getElementById("formularioLimite")
    const handleSubmit = (evento) => {
        evento.preventDefault()
        const formData = new FormData(formulario)
        const data = Object.fromEntries(formData)
        console.log(data)

        setLimiteMensal(formData.get('limite_mensal'))

        fetch('https://crudcrud.com/api/c1171879150141499b3e41bef98a6e92/limite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(formulario.reset())
            
            
    }

    return (
        <>
            <Button ref={target} className={`${styles.botao}`} onClick={() => setShow(!show)}>
                <img src={changeIcon} alt='' />
            </Button>
            <Overlay target={target.current} show={show} placement="left" ref={overlayRef}>
                {(props) => (
                    <Tooltip className={`${styles.overlay}`} id="overlay-example" {...props}>
                        <form id='formularioLimite' onSubmit={handleSubmit}>
                            <span className='fs-5'> Definir meu limite mensal</span>
                            <div className="form-floating mb-3 ">
                                <input type="number" name='limite_mensal' className="form-control fs-5 my-2" placeholder='R$' step={0.01} min={0} required />
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