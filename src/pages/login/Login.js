import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/forms/input/Input';
import styles from './Login.module.css'
import SubmitButton from '../../components/forms/submitButton/SubmitButton';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { InputMsgErro } from '../../utils';


export default function Login() {
    const navigate = useNavigate();
    const { signIn, signed } = useContext(AuthContext);

    const [invalidText, setInvalidText] = useState({});
    let erros = {}

    // FUNÇÃO PRA RESETAR OS ESTILOS DE ERRO QUANDO O USUÁRIO DIGITAR
    const resetStyles = (id) => {
        document.getElementById(id).style.border = ''
        document.getElementById(id).style.outline = ''
        setInvalidText({})
    }

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        const formulario = document.getElementById("formCadastro")
        const formData = new FormData(formulario)
        const data = Object.fromEntries(formData)

        if (data.email === '') {
            erros.email = InputMsgErro('emailLogin', true, 'Digite um e-mail');
            setInvalidText(erros)
            return
        }
        if (data.senha === '') {
            erros.senha = InputMsgErro('senhaLogin', true, 'Digite uma senha')
            setInvalidText(erros)
            return
        }

        const logado = await signIn(data);
        console.log(logado)
        
        if(!logado){
            erros.senha = InputMsgErro('senhaLogin', true, 'Email ou senha Inválidos');
            setInvalidText(erros);
            return
        }
        

    }

    if (signed) {
        navigate('/home');
    }

    if (!signed){
    return (
        <main className={`${styles.main}`}>
            <div className={`d-flex flex-column align-items-center justify-content-center ${styles.body}`}>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src='../../img/infocash-brand/svg/infocash-logo-white.svg' alt="Logo" height="70" className={`me-4 my-4 LOGO`} />
                    <img src='../../img/infocash-brand/svg/infocash-name-white.svg' alt="Logo" height="30" className='my-auto' />
                </div>
                <div className={styles.blurredBackground}></div>

                {/* FORMULÁRIO */}
                <div className={`col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto card p-4`}>
                    <h2 className='text-center mb-4'>Fazer login</h2>
                    <form id='formCadastro' onSubmit={handleSubmit}>

                        <Input name='email' type='email' id='emailLogin' label='E-mail' placeholder="Digite seu e-mail" invalidText={invalidText.email} onChange={() => resetStyles('emailLogin')} />
                        <Input name='senha' type='password' id='senhaLogin' label='Senha' placeholder="Digite sua senha" invalidText={invalidText.senha} onChange={() => resetStyles('senhaLogin')} />

                        <Link to='/recuperar-senha'><span>Esqueceu a senha?</span></Link>
                        <div className='d-flex justify-content-center'>
                            <SubmitButton className='px-4 mt-4' value='Entrar' />
                        </div>

                    </form>
                </div>

                <p className='mt-4 text-white'>É novo por aqui? <Link to='/cadastro'>Clique aqui</Link> para se cadastrar.</p>

            </div>
        </main>
    )
}
}