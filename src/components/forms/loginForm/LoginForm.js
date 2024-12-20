import styles from './LoginForm.module.css'
import Input from '../input/Input'
import SubmitButton from '../submitButton/SubmitButton'

import {Link} from 'react-router-dom'


export default function LoginForm() {
    return (
        <>
        <div className={`col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 col-xxl-2 mx-auto ${styles.loginForm}`}>
                <h2 className='text-center mb-4'>Fazer login</h2>
                <form>
                    
        
                    <Input type='email' id='emailLogin' label='E-mail'/>
                    <Input type='password' id='senhaLogin' label='Senha'/>

                    <div className='d-flex justify-content-center'>
                        <Link to='/'> <SubmitButton className='px-4' value='Entrar'/></Link>
                    </div>
                    
                </form>
                
                
            </div>

            <p className='mt-4'>É novo por aqui? <Link to='/cadastro'>Clique aqui</Link> para se cadastrar.</p>
            

        </>
    )
}