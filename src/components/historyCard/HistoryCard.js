import styles from './HistoryCard.module.css'

export default function HistoryCard({ operacao }) {
    return (
        <div className={`col-12 col-md-4 p-2 ${styles.card_container}`}>
            <div className={`p-3 col-12 ${styles.card}`}>
                <div className={`${styles.card_header}`}>
                    {/* Indicador visual do tipo de operação */}
                    <div className={`${styles.tipo_operacao} ${styles[operacao.tipo]}`}></div>
                    <h6 className={`${styles.card_title}`}>{operacao.titulo}</h6>
                    <span className={`${styles.valor}`}>R$ {parseFloat(operacao.valor).toFixed(2)}</span>
                </div>
                <div className={`${styles.card_body}`}>
                    {/* Valor da operação */}
                    
                    {/* Categoria e subcategoria */}
                    <p className={`${styles.categoria}`}>
                        <strong>Categoria:</strong> {operacao.categoria} ( {operacao.subcategoria} )
                    </p>
                    {/* Data da operação */}
                    <p className={`${styles.data}`}>
                        <strong>Data:</strong> {new Date(operacao.data).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    )




}

