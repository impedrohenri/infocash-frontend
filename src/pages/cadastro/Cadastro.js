import CadastroForm from '../../components/forms/cadastroForm/CadastroForm'
import styles from './Cadastro.module.css'


export default function Cadastro(props) {
    return (
        <main className={`${styles.main}`}>
            <div className={`d-flex flex-column align-items-center justify-content-center ${styles.body}`}>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src='../../img/infocash-brand/png/infocash-logo-black.png' alt="Logo" height="70" className={`me-4 my-4 LOGO`} />
                    <img src='../../img/infocash-brand/png/infocash-name-black.png' alt="Logo" height="30" className='my-auto' />
                </div>
                <CadastroForm />
            </div>
        </main>
    )
}