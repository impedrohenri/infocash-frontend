import { Link } from 'react-router-dom'
import Input from '../input/Input'
import SubmitButton from '../submitButton/SubmitButton'
import styles from './CadastroForm.module.css'

export default function CadastroForm(props) {


    



    return (
        <>
            <div className={`col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto ${styles.cadForm}`}>
                <h2 className='text-center mb-4'>Cadastre-se</h2>
                <form >
                    
                    <Input type='name' id='nomeCadastro' label='Nome' placeholder="Digite seu nome"/>
                    <Input type='email' id='emailCadastro' label='E-mail' placeholder="Digite seu e-mail"/>
                    <Input type='password' id='senhaCadastro' label='Senha' placeholder="Crie uma senha"/>
                    <Input type='password' id='confSenhaCadastro' label='Confirmar senha' placeholder="Confirme a senha"/>

                    <div className='d-flex justify-content-between'>
                    <Link to='/'><SubmitButton value='Cadastrar'/></Link>
                        
                        <input type='reset' className='btn btn-outline-secondary mt-4 '/>
                    </div>
                </form>
            </div>

            <span className='my-4'>Você já tem uma conta? <Link to='/login'>Voltar ao login</Link></span>
        </>
    )
}