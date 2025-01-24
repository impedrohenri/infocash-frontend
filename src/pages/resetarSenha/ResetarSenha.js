import styles from './ResetarSenha.module.css'
import Input from "../../components/forms/input/Input";
import SubmitButton from "../../components/forms/submitButton/SubmitButton";
import { useNavigate } from 'react-router-dom';

export default function ResetarSenha(){

    const navigate = useNavigate()

    const handleSubmit = (evento) => {
		const formulario = document.getElementById("formulario")
		evento.preventDefault();

		const formData = new FormData(formulario)
		const data = Object.fromEntries(formData)
		console.log(data)

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

		fetch(`http://localhost:3005/api/usuario/resetar-senha/${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
        .then((res) => {
            if(res.status === 201){
                navigate('/')
            }}
            
        )
	}
    
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.body}`}>
            <div className='d-flex align-items-center justify-content-center'>
                <img src='../../img/infocash-brand/png/infocash-logo-black.png' alt="Logo" height="70" className={`me-4 my-4 LOGO`} />
                <img src='../../img/infocash-brand/png/infocash-name-black.png' alt="Logo" height="30" className='my-auto' />
            </div>

            <div className={`card col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto p-4`}>
                <h2 className='text-center mb-4'>Resetar Senha</h2>
                <span className='pb-4 mb-4'>Digite sua nova senha.</span>
                <form id='formulario' onSubmit={handleSubmit}>
                    <Input name='senhaNova' label='Nova senha'/>
                    <SubmitButton value='Confirmar'/>
                </form>
            </div>
        </div>
    )
}