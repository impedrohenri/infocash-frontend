import Header from '../../components/header/Header'
import styles from './DicasFinanceiras.module.css'

export default function DicasFinaceiras(props) {
    return (
        <>
            <Header/>
            <h1 className={styles.text}>Página Dicas Financeiras</h1>
        </>
    )
}