import LoginForm from '../../components/forms/loginForm/LoginForm'
import LOGO from '../../img/vasalirelsol.png'
import styles from './Login.module.css'

export default function Login(props){
    return(
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex align-items-center justify-content-center'>
            <img src={LOGO} alt="Logo" width="50" height="50" className={`m-4 LOGO ${styles.LOGO}`}/>
            <h1>Vinanças</h1>
            </div>
            <LoginForm/>
        </div>
    )
}