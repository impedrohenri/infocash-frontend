import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Header from '../../components/header/Header'
import styles from './MeuPerfil.module.css'
import { AuthContext } from '../../contexts/AuthContext';

export default function MeuPerfil(props) {
    const [isLocked, setIsLocked] = useState(true);
    const navigate = useNavigate();  // Adiciona o hook useNavigate

    const handleUnlock = () => {
        setIsLocked(!isLocked);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('deslogando')
        localStorage.clear()
        window.location.href="http://localhost:3000/"
    }

    return (
        <>
            <Header />

            <main className={`card`}>
                <h1 className={`${styles.h1}`}>Meu Perfil</h1>
                <section className={`${styles.section}`}>
                    <button className={`btn ms-auto d-flex ${styles.unlock_input} ${styles.button}`} onClick={handleUnlock}><img src='../../img/infocash-brand/svg/infocash-doublearrow-black.svg' alt='' height={20}/></button>
                    <form>
                        <label for="exampleInputEmail1" className={`form-label ${styles.label}`}>Email</label>
                        <div className="input-group mb-3">
                            <input type="email" placeholder='exemplo@email.com' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={isLocked}/>
                            <button className={`btn btn-outline-dark ${styles.button}`} type="button" disabled={isLocked}>Alterar</button>
                        </div>
                        </form>
                        <form>
                        <label for="mudarSenha" className={`form-label ${styles.label}`}>Senha</label>
                        <div className="input-group mb-3">
                            <input type="password" placeholder='°°°°°°°°°°°' className="form-control" id="mudarSenha" aria-describedby="emailHelp" disabled={isLocked}/>
                            <button type='submit' className={`btn btn-outline-dark ${styles.button}`}  disabled={isLocked}>Alterar</button>
                        </div>
                    </form>
                </section>

                <form onSubmit={handleSubmit}>
                    <button type='submit'>Sair</button>
                </form>
                

            </main>
        </>
    )
}