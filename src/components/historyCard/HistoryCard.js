import CardModal from '../cardModal/CardModal';
import styles from './HistoryCard.module.css'

export default function HistoryCard({ operacao, reloadAPI, setReloadAPI }) {
    const novaData = new Date(operacao.data);
    novaData.setDate(novaData.getDate() + 1);
    const dataFormatada = novaData.toLocaleDateString();

    return (
        <div className={`col-12 col-lg-4 col-md-6 p-2 ${styles.card_container}`}>
            <div className={`p-3 col-12 ${styles.card}`}>
                <div className={`${styles.card_header}`}>

                    <div className='d-flex align-items-center gap-2'>
                        <div className={`${styles.tipo_operacao} ${styles[operacao.tipo]}`}></div>
                        <h6 className={`${styles.card_title}`}>{operacao.titulo}</h6>
                    </div>


                    <div className={`${styles.card_menu}`}>
                        <div className={`${styles.menu_icon}`}>
                            <img src='img/icons/card_menu.png' height={30} alt=''/>
                        </div>
                        {/* MENU DO CARD (3 Poontinhos) */}
                        <div className={`${styles.menu_body}`}>
                            <ul className="list-group list-group-flush">
                                {/* BOT */}
                                <li className="list-group-item p-0">
                                    {operacao.processado === false && (<CardModal src='/img/icons/card_edit.png' text='Editar' id={operacao.id_registro} reloadAPI={reloadAPI} setReloadAPI={setReloadAPI}/>)}
                                </li>
                                <li className="list-group-item p-0">
                                    <CardModal src='/img/icons/card_delete.png' text='Deletar' id={operacao.id_registro} reloadAPI={reloadAPI} setReloadAPI={setReloadAPI}/>
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
                    <div className={`d-flex ms-auto w-100 justify-content-end ${styles.valor}`}><span>R$ {parseFloat(operacao.valor).toFixed(2)}</span></div>
                </div>
            </div>
        </div>
    )




}

