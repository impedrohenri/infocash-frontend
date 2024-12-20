import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import styles from './MeuPerfil.module.css'

export default function MeuPerfil(props){
    return(
        <>
            <Header/>
            <h1 className={styles.text}>Página Meu Perfil</h1>
            <p className={styles.text2}><Link to='/login'>SAIR</Link></p>
        </>
    )
}