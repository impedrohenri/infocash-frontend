import { Link } from 'react-router-dom'
import styles from './RecuperarSenha.module.css'

export default function RecuperarSenha() {
    return (
        <body className={`d-flex flex-column align-items-center justify-content-center ${styles.body}`}>
            <div className='d-flex align-items-center justify-content-center'>
                <img src='../../img/infocash-brand/png/infocash-logo-black.png' alt="Logo" height="70" className={`me-4 my-4 LOGO`} />
                <img src='../../img/infocash-brand/png/infocash-name-black.png' alt="Logo" height="30" className='my-auto' />
            </div>

            <div className={`card col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto p-4`}>
                <h2 className='text-center mb-4'>Recuperar Senha</h2>
                <span className='pb-4 mb-4'>Informe seu email, um código será enviado para que possa dar continuidade a recuperação de senha.</span>
                <form onSubmit={''}>
                    <label className='form-label fw-semibold fs-5' htmlFor='email' >Email</label>
                    <input type='email' className='form-control' id='email' placeholder='Informe seu email'/>
            

                    <div className='d-flex justify-content-between'>
                        <Link to='/login'><div className='btn btn-primary mt-4'>Cancelar</div></Link>
                        <button type='submit' className='btn btn-outline-secondary mt-4'>Enviar</button>
                    </div>
                </form>
            </div>
        </body>
    )
}