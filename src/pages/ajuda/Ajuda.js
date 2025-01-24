import Header from '../../components/header/Header'
import styles from './Ajuda.module.css'

export default function Ajuda(props) {
    return (
        <>
            <Header />
            <main className='d-flex flex-column justify-content-center align-items-center'>
                <h1 className='fs-1 mb-4 pb-4'>Guia do usuário</h1>
                <h2 className='m-4'>Página Principal</h2>
                
                <div className='card col-12 col-sm-10 col-md-6 justify-self-center mx-auto p-4 mb-4'><img src='../../img/telas/TelaPrincipal.png' alt='' className={`${styles.image}`} />
                    <ul className='m-4 gap-4'>
                        <li><strong>Saldo total:</strong> Exibe o valor consolidado de todas as receitas menos todas as despesas registradas, indicando o total disponível ou devido.
                        </li><br/>

                        <li>
                        <strong>Entrada:</strong> Exibe o valor da  soma  de receitas registradas, como salários, vendas ou outros ganhos.
                        </li><br/>

                        <li>
                        <strong>Saída:</strong> Mostra o valor total de despesas registradas, incluindo gastos fixos, variáveis e outros pagamentos.
                        </li><br/>

                        <li>
                        <strong>+Operação:</strong> Possibilita o registro de uma nova transação, seja ela de entrada (receita) ou saída (despesa), com campos para especificar o valor, a categoria, a subcategoria, a data, um título que descreva a finalidade do registro e a sua recorrência.
                        </li><br/>

                        <li>
                        <strong>Registros:</strong> Esta seção exibe os registros gerados a partir das operações realizadas, representando gastos ou rendas correspondentes ao mundo real. Cada registro apresenta um título, um símbolo (🔴) para indicar uma saída ou (🟢) para indicar uma entrada, além da categoria e da data em que o valor será debitado ou creditado na conta.
                        </li><br/>
                    </ul>
                </div>
                
                <h2 className='m-4'>Modal de Transação</h2>
                <div className='card col-12 col-sm-10 col-md-6 justify-self-center mx-auto p-4'><img src='../../img/telas/TelaModal.png' alt='' className={`${styles.image}`}/>
                    <ul className='m-4 gap-4'>
                        <li>
                            <strong>Entrada:</strong> Marcador utilizado para indicar que o registro será adicionado como um valor de entrada na conta.
                        </li><br/>

                        <li>
                            <strong>Saída:</strong> Marcador utilizado para indicar que o registro será adicionado como um valor de saída da conta.
                        </li><br/>

                        <li>
                            <strong>Título:</strong> Campo destinado à descrição do propósito ou natureza do registro.
                        </li><br/>

                        <li>
                            <strong>Valor:</strong> Representa o montante a ser inserido ou retirado no registro, dependendo da operação (Entrada ou Saída).
                        </li><br/>

                        <li>
                            <strong>Categoria:</strong>Campo destinado à seleção da categoria correspondente à despesa ou receita (ex.: Alimentação, Saúde, Educação, etc.).
                        </li><br/>

                        <li>
                            <strong>Subcategoria:</strong> Representa uma especificação mais detalhada da categoria. Por exemplo, para a categoria "Alimentação", a subcategoria pode ser "Supermercado", "Restaurante" ou "Lanche".
                        </li><br/>

                        <li>
                            <strong>Data:</strong> Indica o momento em que o registro terá impacto na conta, seja como acréscimo ou redução do saldo. Registros com a data do dia atual serão processados automaticamente.
                        </li><br/>

                        <li>
                            <strong>Recorrência:</strong> Define se o registro será fixo ou não, com as opções de "Operação Única" ou "Operação Recorrente" (semanal, mensal ou anual).
                        </li><br/>

                        <li>
                            <strong>Confirmar:</strong> Botão responsável por adicionar o registro à conta.
                        </li><br/>
                    </ul>
                </div>
            </main>
        </>
    )
}