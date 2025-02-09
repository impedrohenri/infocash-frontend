import styles from './ResetarSenha.module.css'
import Input from "../../components/forms/input/Input";
import SubmitButton from "../../components/forms/submitButton/SubmitButton";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputMsgErro } from '../../utils';

export default function ResetarSenha() {
    const navigate = useNavigate()
    const [invalidText, setInvalidText] = useState({});
    const erros = {}

    const resetStyles = (id) => {
        document.getElementById(id).style.border = ''
        document.getElementById(id).style.outline = ''
        setInvalidText({})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {}

        data.senhaNova = event.target.senhaNova.value;
        

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (data.senhaNova === '') {
            erros.senhaNova = InputMsgErro('senhaNova', true, 'Crie uma senha');
            setInvalidText(erros);
            return
        } else if (data.senhaNova.length < 8) {
            erros.senhaNova = InputMsgErro('senhaNova', true, 'A senha deve conter no mínimo 8 caracteres');
            setInvalidText(erros);
            return
        }
        if (data.confirmar === '') {
            erros.confirmar = InputMsgErro('confirmar', true, 'Digite sua senha novamente');
            setInvalidText(erros);
            return
        } else if (data.senhaNova !== event.target.confirmar.value) {
            erros.confirmar = InputMsgErro('confirmar', true, 'As senhas não coincidem');
            setInvalidText(erros);
            return
        }

        fetch(`http://localhost:3005/api/usuario/resetar-senha/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/')
                }
            })
    }

    return (
        <main className={`${styles.main}`}>
            <div className={`d-flex flex-column align-items-center justify-content-center ${styles.body}`}>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src='../../img/infocash-brand/png/infocash-logo-black.png' alt="Logo" height="70" className={`me-4 my-4 LOGO`} />
                    <img src='../../img/infocash-brand/png/infocash-name-black.png' alt="Logo" height="30" className='my-auto' />
                </div>

                <div className={`card col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto p-4`}>
                    <h2 className='text-center mb-4'>Resetar Senha</h2>
                    <span className='pb-4 fs-5 fw-semibold'>Digite sua nova senha.</span>
                    <form id='formulario' onSubmit={handleSubmit}>
                        <Input name='senhaNova' id='senhaNova' type='password' label='Nova senha' invalidText={invalidText.senhaNova}
                                    onChange={() => resetStyles('senhaNova')}/>
                        <Input name='confirmar' id='confirmar' type='password' label='Nova senha' invalidText={invalidText.confirmar} onChange={() => resetStyles('confirmar')}/>
                        <SubmitButton value='Confirmar' />
                    </form>
                </div>
            </div>
        </main>
    )
}