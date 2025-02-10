import { Link } from 'react-router-dom'
import styles from './RecuperarSenha.module.css'
import SubmitButton from '../../components/forms/submitButton/SubmitButton';

export default function RecuperarSenha() {


    const handleSubmit = (e) => {
        e.preventDefault();
		const formData = new FormData(document.getElementById("formulario"))
		const data = Object.fromEntries(formData)
		console.log(data)

		fetch(`http://localhost:3005/api/usuario/esquecer-senha`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
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
                <h2 className='text-center mb-4'>Recuperar Senha</h2>
                <span className='pb-4 mb-4'>Informe seu email, um código será enviado para que possa dar continuidade a recuperação de senha.</span>
                <form id='formulario' onSubmit={handleSubmit}>
                    <label className='form-label fw-semibold fs-5' htmlFor='email' >Email</label>
                    <input type='email' name='email' className='form-control' id='email' placeholder='Informe seu email'/>
            

                    <div className='d-flex justify-content-between'>
                        <Link to='/'><div className='btn btn-outline-secondary mt-4'>Cancelar</div></Link>
                        <SubmitButton value='Enviar' className='mt-4'/>
                    </div>
                </form>
            </div>
        </div>
        </main>
    )
}