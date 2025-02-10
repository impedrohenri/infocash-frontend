import styles from './SubmitButton.module.css'

export default function SubmitButton(props) {
    return (
        <button type="submit" className={`btn btn-primary ${props.className} ${styles.botao}`}id={props.id} onClick={props.onClick} form={props.form} htmlFor={props.htmlFor}>
            {props.value}
        </button>
    )
}