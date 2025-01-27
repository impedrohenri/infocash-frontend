import { Link, useNavigate } from 'react-router-dom'
import Input from '../input/Input'
import SubmitButton from '../submitButton/SubmitButton'
import { useState } from 'react';
import { InputMsgErro } from '../../../utils';

export default function CadastroForm(props) {
    const navigate = useNavigate();
    const [invalidText, setInvalidText] = useState({});
    let erros = {};
    
    const resetStyles = (id) => {
        document.getElementById(id).style.border = ''
        document.getElementById(id).style.outline = ''
        setInvalidText({})
    }

    const handleSubmit = (evento) => {
        evento.preventDefault();
		const formData = new FormData(document.getElementById("formCadastro"));
		const data = Object.fromEntries(formData);

        if(data.nome === ''){
            erros.nome = InputMsgErro('nomeCadastro', true, 'Informe seu nome');
            setInvalidText(erros);
            return
        }
        if((data.email === '')){
            erros.email = InputMsgErro('emailCadastro', true, 'Informe um email válido');
            setInvalidText(erros);
            return
        }
        if(data.senha === ''){
            erros.senha = InputMsgErro('senhaCadastro', true, 'Crie uma senha');
            setInvalidText(erros);
            return
        } else if (data.senha.length < 8 ){
            erros.senha = InputMsgErro('senhaCadastro', true, 'A senha deve conter no mínimo 8 caracteres');
            setInvalidText(erros);
            return
        }
        if(data.confirmar=== ''){
            erros.confirmar = InputMsgErro('confirmarCadastro', true, 'Digite sua senha novamente');
            setInvalidText(erros);
            return
        } else if (data.senha !== data.confirmar){
            erros.confirmar = InputMsgErro('confirmarCadastro', true, 'As senhas não coincidem');
            setInvalidText(erros);
            return
        }


		fetch('http://localhost:3005/api/usuario/cadastrar', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
        .then(res => {
            if (res.status === 201) {
                navigate('/');
            } else if (res.status === 400) {
                erros.email = InputMsgErro('emailCadastro', true, 'E-mail já cadastrado.');
                setInvalidText(erros)
            }
        })
	}

    return (
        <>
            <div className={`card col-11 col-xs-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 mx-auto p-4`}>
                <h2 className='text-center mb-4'>Cadastre-se</h2>
                <form id='formCadastro' onSubmit={handleSubmit}>

                    <Input name='nome' type='name' id='nomeCadastro' label='Nome' placeholder="Digite seu nome" invalidText={invalidText.nome} onChange={() => resetStyles('nomeCadastro')}/>
                    <Input name='email' type='email' id='emailCadastro' label='E-mail' placeholder="Digite seu e-mail" invalidText={invalidText.email} onChange={() => resetStyles('emailCadastro')}/>
                    <Input name='senha' type='password' id='senhaCadastro' label='Senha' placeholder="Crie uma senha" invalidText={invalidText.senha} onChange={() => resetStyles('senhaCadastro')}/>
                    <Input name='confirmar' type='password' id='confirmarCadastro' label='Confirmar senha' placeholder="Confirme a senha" invalidText={invalidText.confirmar} onChange={() => resetStyles('confirmarCadastro')}/>

                    <div className='d-flex justify-content-between'>
                    <SubmitButton value='Cadastrar'/>
                        
                        <input type='reset' className='btn btn-outline-secondary mt-4 ' value='Limpar'/>
                    </div>
                </form>
            </div>
            <span className='my-4 text-white'>Você já tem uma conta? <Link to='/'>Voltar ao login</Link></span>
        </>
    )
}