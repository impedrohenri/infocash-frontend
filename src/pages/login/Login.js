import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/forms/input/Input';
import styles from './Login.module.css'
import SubmitButton from '../../components/forms/submitButton/SubmitButton';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


export default function Login() {
    const { signIn, signed } = useContext(AuthContext);

    const handleSubmit = async (evento) => {
        const formulario = document.getElementById("formCadastro")
        evento.preventDefault();
        console.log(formulario)
        const formData = new FormData(formulario)
        console.log([...formData.entries()]);
        const data = Object.fromEntries(formData)
        console.log(data)

        await signIn(data);

    };

    const navigate = useNavigate(); // Hook para redireciona
    if (signed) {
        navigate('/home');
    }

    if (!signed) {
        return (
            <div className={`d-flex flex-column align-items-center justify-content-center ${styles.body}`}>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src='../../img/infocash-brand/png/infocash-logo-black.png' alt="Logo" height="70" className={`me-4 my-4 LOGO`} />
                    <img src='../../img/infocash-brand/png/infocash-name-black.png' alt="Logo" height="30" className='my-auto' />
                </div>


                {/* FORMULÁRIO */}
                <div className={`col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto card p-4`}>
                    <h2 className='text-center mb-4'>Fazer login</h2>
                    <form id='formCadastro' onSubmit={handleSubmit}>


                        <Input name='email' type='email' id='emailLogin' label='E-mail' placeholder="Digite seu e-mail" />
                        <Input name='senha' type='password' id='senhaLogin' label='Senha' placeholder="Digite sua senha" />
                        <Link to='/recuperar-senha'><span>Esqueceu a senha?</span></Link>
                        <div className='d-flex justify-content-center'>
                            <SubmitButton className='px-4' value='Entrar' />
                        </div>

                    </form>


                </div>

                <p className='mt-4'>É novo por aqui? <Link to='/cadastro'>Clique aqui</Link> para se cadastrar.</p>





            </div>
        )
    }
}