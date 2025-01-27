import styles from './SubmitButton.module.css'

export default function SubmitButton(props) {
    return (
        <button type="submit" className={`btn btn-primary mt-4 ${props.className} ${styles.botao}`}
        
        id={props.id}>{props.value}</button>
    )
}