import Header from '../../components/header/Header'


export default function DicasFinaceiras(props) {
    return (
        <>
            <Header />
            <main>
                <div className="accordion col-11 col-md-8 mx-auto" id="accordionExample">
                    <h1 className='ms-3'>Dicas e Estratégias</h1>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapseOne" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                1. Poupar em Contas Separadas
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <p><strong>Conta para Emergências:</strong> Você sabia que ter uma conta separada para emergências pode te ajudar a lidar com imprevistos de forma tranquila? Se ainda não tem, procure por bancos digitais que oferecem rendimento automático nessas contas. Isso vai garantir que, mesmo em momentos de urgência, seu dinheiro esteja crescendo, e não parado.<br />
                                    <strong>Conta para Viagens:</strong> Pensando em viajar? Criar uma conta específica para essa finalidade pode ser uma ótima maneira de se planejar. Procure contas com boas taxas de juros para acumular o valor necessário sem sentir tanto o impacto das economias no seu dia a dia.<br />
                                    <strong>Conta para Aposentadoria:</strong> Já pensou em começar a guardar para a sua aposentadoria? Existem planos de previdência, como os PGBL e VGBL, que podem te ajudar nesse processo. Além disso, esses fundos têm benefícios fiscais que podem ser vantajosos para você no longo prazo.</p>

                            </div>
                        </div>
                    </div>


                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                2. Investir em Fundos de Baixo Risco
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <strong>Alternativas à Poupança:</strong> A poupança é uma opção segura, mas a rentabilidade não é das melhores. Que tal explorar alternativas que oferecem maior retorno com segurança? O Tesouro Direto, por exemplo, é uma excelente opção de baixo risco e pode ser ideal para quem busca mais rentabilidade com segurança. Você pode escolher entre Tesouro Selic, Tesouro Prefixado e Tesouro IPCA, conforme sua necessidade.”<br />
                                <strong>CDBs e LCIs/LCAs:</strong> “Investir em CDBs ou LCIs/LCAs pode ser uma alternativa para quem deseja rentabilidade superior à poupança e mais segurança. Eles têm prazos mais curtos e liquidez diária, o que te dá mais flexibilidade. Vale a pena pesquisar as melhores opções!

                            </div>
                        </div>
                    </div>


                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                3. Diversificação de Investimentos
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <strong>Importância da Diversificação:</strong> Diversificar os investimentos é uma forma inteligente de reduzir os riscos e aumentar seus retornos. Ao investir em ações, você pode ter maior potencial de ganhos, mas sempre se atente ao seu perfil de risco. Caso prefira algo mais seguro, os fundos imobiliários e a compra de imóveis podem ser boas opções para garantir a rentabilidade no longo prazo.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                4. Automatização de Investimentos
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <strong>Investimentos Automáticos:</strong> Se você ainda não automatizou seus investimentos, pode ser uma boa hora de começar. Plataformas como XP Investimentos, Modal Mais ou Rico oferecem robôs de investimento que fazem todo o trabalho para você, selecionando as melhores opções com base no seu perfil.<br/>
                                <strong>Round-up:</strong> Você já experimentou o round-up? Alguns aplicativos permitem que você arredonde suas compras para cima, e a diferença vai diretamente para um investimento. Isso ajuda você a economizar de forma automática e sem nem perceber, como o AloTech, Stoodi ou Rico.

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            5. Evitar o Consumo Impulsivo
                            </button>
                        </h2>
                        <div id="collapseFive" className="accordion-collapse collapse">
                            <div className="accordion-body">
                            <strong>Controle de Consumo:</strong> Manter o controle de seus gastos pode ser mais fácil do que parece! Existem apps como Mobills, GuiaBolso ou Minhas Economias que ajudam a bloquear compras por impulso e permitem que você acompanhe seu orçamento com mais clareza.<br/>
                            <strong> Alertas de Gastos:</strong> Vários bancos e apps de finanças enviam alertas sempre que você está perto de ultrapassar o limite do seu orçamento em uma categoria. Isso pode ser uma boa forma de controlar seus gastos e evitar surpresas no fim do mês.
                            </div>
                        </div>
                    </div>

                    <h1 className='m-4 p-4'>Dicas e Estratégias Usando o Site</h1>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            1. Planejamento de Metas Financeiras
                            </button>
                        </h2>
                        <div id="collapseSix" className="accordion-collapse collapse">
                            <div className="accordion-body">
                            <strong>Visão Clara dos Gastos Diários:</strong> Aqui no site, você pode acompanhar seus gastos de forma simples e direta. Use seu histórico de visualização dos gastos para visualizar a linha do tempo dos seus gastos ao longo do mês e planeje com mais clareza onde você pode economizar para alcançar suas metas financeiras.

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                            2. Veja Com o Que Você Gasta Mais
                            </button>
                        </h2>
                        <div id="collapseSeven" className="accordion-collapse collapse">
                            <div className="accordion-body">
                            <strong>Gráficos Interativos:</strong> Fique de olho no que mais impacta seu bolso! Com nossos gráficos de pizza ou barras de progressão, você verá claramente onde está gastando mais. Se perceber que está gastando muito em um item, como alimentação ou lazer, pode ser a hora de ajustar os gastos e economizar um pouco mais.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                            3. Defina Metas e Possíveis Gastos Futuros
                            </button>
                        </h2>
                        <div id="collapseEight" className="accordion-collapse collapse">
                            <div className="accordion-body">
                            <strong>Simulador de Gastos Futuros:</strong> Quer se planejar para o futuro sem correr riscos? Use nossa ferramenta de simulação de gastos para definir suas metas financeiras. Ela vai te mostrar de forma prática como alcançar seus objetivos sem extrapolar o orçamento.


                            </div>
                        </div>
                    </div>
                </div >
            </main>
        </>
    )
}