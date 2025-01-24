import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Header from '../../components/header/Header'
import styles from './MeuPerfil.module.css'
import { AuthContext } from '../../contexts/AuthContext';

export default function MeuPerfil(props) {
    const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"]
    const [dadosUsuario, setDadosUsuario] = useState({})

    const [isLocked, setIsLocked] = useState(true);
    // FUNÇÃO PARA DESTRAVAR INPUTS
    const handleUnlock = () => {
        setIsLocked(!isLocked);
    };

    const handleSair = (e) => {
        e.preventDefault()
        localStorage.clear()
        window.location.href = "http://localhost:3000/"
    }

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            fetch(`http://localhost:3005/api/usuario/${id}`)
                .then((res) => { return res.json() })
                .then((resp) => setDadosUsuario(resp))

        };

        fetchDadosUsuario();
    }, [id]);

    const handleTrocarSenha = (e) => {
        const formulario = document.getElementById('formEmail')
        e.preventDefault()
        const formData = new FormData(formulario)
        const data = Object.fromEntries(formData)

        fetch(`http://localhost:3005/api/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        console.log(data)
    }

    return (
        <>
            <Header />

            <main className={`card`}>
                <h1 className={`${styles.h1}`}>Meu Perfil</h1>
                <section className={`${styles.section}`}>

                    <button className={`btn ms-auto d-flex ${styles.unlock_input} ${styles.button}`} onClick={handleUnlock}><img src='../../img/infocash-brand/svg/infocash-doublearrow-black.svg' alt='' height={20} /></button>

                    <form id='formEmail' onSubmit={handleTrocarSenha}>

                        <label htmlFor="InputNome" className={`form-label ${styles.label}`}>Nome de Usuário</label>
                        <div className="input-group mb-3">
                            <input type="text" name='nome' placeholder='Seu nome' className="form-control" id="InputNome" aria-describedby="emailHelp" disabled={isLocked} defaultValue={dadosUsuario['nome']} required/>
                        </div>

                        <label htmlFor="InputEmail" className={`form-label ${styles.label}`}>Email</label>
                        <div className="input-group mb-3">
                            <input type="email" name='email' placeholder='exemplo@email.com' className="form-control" id="InputEmail" aria-describedby="emailHelp" disabled={isLocked} defaultValue={dadosUsuario['email']} required/>
                        </div>

                        <label htmlFor="InputSenha1" className={`form-label ${styles.label}`}>Senha Anterior</label>
                        <div className="input-group mb-3">
                            <input type="password" name='senhaAnterior' placeholder='°°°°°°°°°°°' className="form-control" id="InputSenha1" aria-describedby="emailHelp" disabled={isLocked} required/>
                        </div>

                        <label htmlFor="InputSenha2" className={`form-label ${styles.label}`}>Nova senha</label>
                        <div className="input-group mb-3">
                            <input type="password" name='senhaNova' placeholder='°°°°°°°°°°°' className="form-control" id="InputSenha2" aria-describedby="emailHelp" disabled={isLocked} required/>
                        </div>

                        <label htmlFor="InputSenha3" className={`form-label ${styles.label}`}>Confirmar nova senha</label>
                        <div className="input-group mb-3">
                            <input type="password" name='confirmar' placeholder='°°°°°°°°°°°' className="form-control" id="InputSenha3" aria-describedby="emailHelp" disabled={isLocked} required/>
                        </div>

                        <button className={`btn btn-outline-dark ${styles.button}`} type="submit" disabled={isLocked}>Alterar</button>
                    </form>
                </section>

                <form onSubmit={handleSair}>
                    <button type='submit' className='btn btn-primary'>Sair</button>
                </form>


            </main>
        </>
    )
}