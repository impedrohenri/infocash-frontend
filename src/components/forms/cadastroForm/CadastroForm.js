import { Link } from 'react-router-dom'
import Input from '../input/Input'
import SubmitButton from '../submitButton/SubmitButton'

export default function CadastroForm(props) {


    
    const handleSubmit = (evento) => {
        const formulario = document.getElementById("formCadastro")
		evento.preventDefault();
        console.log(formulario)
		const formData = new FormData(formulario)
        console.log([...formData.entries()]);
		const data = Object.fromEntries(formData)
		console.log(data)

		fetch('http://localhost:3005/api/usuario/cadastrar', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
        .then(res => {
            if (res.status === 201) {
                window.location.replace('http://localhost:3000/');
            }
        })
	}

    return (
        <>
            <div className={`card col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto p-4`}>
                <h2 className='text-center mb-4'>Cadastre-se</h2>
                <form id='formCadastro' onSubmit={handleSubmit}>
                    


                    <Input name='nome' type='name' id='nomeCadastro' label='Nome' placeholder="Digite seu nome" required='true'/>
                    <Input name='email' type='email' id='emailCadastro' label='E-mail' placeholder="Digite seu e-mail" required='true'/>
                    <Input name='senha' type='password' id='senhaCadastro' label='Senha' placeholder="Crie uma senha" required='true' />
                    <Input name='confirmar' type='password' id='confSenhaCadastro' label='Confirmar senha' placeholder="Confirme a senha" required='true'/>

                    <div className='d-flex justify-content-between'>
                    <SubmitButton value='Cadastrar'/>
                        
                        <input type='reset' className='btn btn-outline-secondary mt-4 ' value='Limpar'/>
                    </div>
                </form>
            </div>

            <span className='my-4'>Você já tem uma conta? <Link to='/'>Voltar ao login</Link></span>
        </>
    )
}