import LoginForm from '../../components/forms/loginForm/LoginForm'
import LOGO from '../../img/infocash-brand/png/infocash-logo-black.png';
import NAME from '../../img/infocash-brand/png/infocash-name-black.png';
import styles from './Login.module.css'

export default function Login(props) {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.body}`}>
            <div className='d-flex align-items-center justify-content-center'>
                <img src={LOGO} alt="Logo" height="70" className={`me-4 my-4 LOGO`} />
                <img src={NAME} alt="Logo" height="30" className='my-auto' />
            </div>
            <LoginForm />
        </div>
    )
}