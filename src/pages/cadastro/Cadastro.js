import CadastroForm from '../../components/forms/cadastroForm/CadastroForm'
import LOGO from '../../img/vasalirelsol.png'
import styles from  './Cadastro.module.css'


export default function Cadastro(props) {
    return (
    
        <div className={`d-flex flex-column align-items-center col-12 ${styles.body}`}>
            
            <div className='d-flex align-items-center justify-content-center'>
            <img src={LOGO} alt="Logo" width="50" height="50" className={`m-4 LOGO ${styles.LOGO}`}/>
            <h1>Vinanças</h1>
            </div>
            <CadastroForm />
        </div>
    )
}