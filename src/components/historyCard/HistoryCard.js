import CardModal from '../cardModal/CardModal';
import styles from './HistoryCard.module.css'

export default function HistoryCard({ operacao }) {
    const novaData = new Date(operacao.data);
    novaData.setDate(novaData.getDate() + 1);
    const dataFormatada = novaData.toLocaleDateString();

    return (
        <div className={`col-12 col-lg-4 col-md-6 p-2 ${styles.card_container}`}>
            <div className={`p-3 col-12 ${styles.card}`}>
                <div className={`${styles.card_header}`}>
                    {/* Indicador visual do tipo de operação */}
                    <div className={`${styles.tipo_operacao} ${styles[operacao.tipo]}`}></div>
                    <h6 className={`${styles.card_title}`}>{operacao.titulo}</h6>
                    <span className={`${styles.valor}`}>R$ {parseFloat(operacao.valor).toFixed(2)}</span>

                    <div className={`${styles.card_menu}`}>
                        <div className={`${styles.menu_icon}`}>
                            <img src='img/icons/card_menu.png' height={30} />
                        </div>
                        <div className={`${styles.menu_body}`}>
                        <ul class="list-group list-group-flush">
                                <li class="list-group-item p-0">
                                    <CardModal src='/img/icons/card_edit.png' text='Editar' id={operacao.id_registro}/>
                                </li>
                                <li class="list-group-item p-0">
                                    <CardModal src='/img/icons/card_delete.png' text='Deletar' id={operacao.id_registro}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <div className={`${styles.card_body}`}>
                    {/* Categoria e subcategoria */}
                    <p className={`${styles.categoria}`}>
                        <strong>Categoria:</strong> {operacao.categoria} ( {operacao.subcategoria} )
                    </p>
                    {/* Data da operação */}
                    <p className={`${styles.data}`}>
                        <strong>Data:</strong> {dataFormatada}
                    </p>
                </div>
            </div>
        </div>
    )




}

