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
        data.id = id;
        data.nome = dadosUsuario.nome;
        data.senhaAntiga = dadosUsuario.senha;
        console.log(data)

        fetch(`http://localhost:3005/api/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
    }

    return (
        <>
            <Header />

            <main className={`card`}>
                <h1 className={`${styles.h1}`}>Meu Perfil</h1>
                <section className={`${styles.section}`}>
                    <button className={`btn ms-auto d-flex ${styles.unlock_input} ${styles.button}`} onClick={handleUnlock}><img src='../../img/infocash-brand/svg/infocash-doublearrow-black.svg' alt='' height={20} /></button>
                    <form id='formEmail' onSubmit={handleTrocarSenha}>
                        <label htmlFor="InputEmail" className={`form-label ${styles.label}`}>Email</label>
                        <div className="input-group mb-3">
                            <input type="email" name='email' placeholder='exemplo@email.com' className="form-control" id="InputEmail" aria-describedby="emailHelp" disabled={isLocked} defaultValue={dadosUsuario['email']} />

                        </div>
                        <label htmlFor="mudarSenha" className={`form-label ${styles.label}`}>Senha</label>
                        <div className="input-group mb-3">
                            <input type="password" name='senhaNova' placeholder='°°°°°°°°°°°' className="form-control" id="mudarSenha" aria-describedby="emailHelp" disabled={isLocked} />
                        </div>
                        <label htmlFor="mudarSenha2" className={`form-label ${styles.label}`}>Senha</label>
                        <div className="input-group mb-3">
                            <input type="password" name='senhaNovaConfirmar' placeholder='°°°°°°°°°°°' className="form-control" id="mudarSenha2" aria-describedby="emailHelp" disabled={isLocked} />
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