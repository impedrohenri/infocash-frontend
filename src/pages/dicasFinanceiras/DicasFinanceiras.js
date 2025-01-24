import Header from '../../components/header/Header'


export default function DicasFinaceiras(props) {
    return (
        <>
            <Header />
            <main>
                <div className="accordion col-11 col-md-8 mx-auto" id="accordionExample">
                    <h1 className='ms-3'>Dicas e Estratégias Fora do Site</h1>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                1. Poupar em Contas Separadas
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show">
                            <div class="accordion-body">
                                <p><strong>Conta para Emergências:</strong> Você sabia que ter uma conta separada para emergências pode te ajudar a lidar com imprevistos de forma tranquila? Se ainda não tem, procure por bancos digitais que oferecem rendimento automático nessas contas. Isso vai garantir que, mesmo em momentos de urgência, seu dinheiro esteja crescendo, e não parado.<br />
                                    <strong>Conta para Viagens:</strong> Pensando em viajar? Criar uma conta específica para essa finalidade pode ser uma ótima maneira de se planejar. Procure contas com boas taxas de juros para acumular o valor necessário sem sentir tanto o impacto das economias no seu dia a dia.<br />
                                    <strong>Conta para Aposentadoria:</strong> Já pensou em começar a guardar para a sua aposentadoria? Existem planos de previdência, como os PGBL e VGBL, que podem te ajudar nesse processo. Além disso, esses fundos têm benefícios fiscais que podem ser vantajosos para você no longo prazo.</p>

                            </div>
                        </div>
                    </div>


                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                2. Investir em Fundos de Baixo Risco
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <strong>Alternativas à Poupança:</strong> A poupança é uma opção segura, mas a rentabilidade não é das melhores. Que tal explorar alternativas que oferecem maior retorno com segurança? O Tesouro Direto, por exemplo, é uma excelente opção de baixo risco e pode ser ideal para quem busca mais rentabilidade com segurança. Você pode escolher entre Tesouro Selic, Tesouro Prefixado e Tesouro IPCA, conforme sua necessidade.”<br />
                                <strong>CDBs e LCIs/LCAs:</strong> “Investir em CDBs ou LCIs/LCAs pode ser uma alternativa para quem deseja rentabilidade superior à poupança e mais segurança. Eles têm prazos mais curtos e liquidez diária, o que te dá mais flexibilidade. Vale a pena pesquisar as melhores opções!

                            </div>
                        </div>
                    </div>


                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                3. Diversificação de Investimentos
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <strong>Importância da Diversificação:</strong> Diversificar os investimentos é uma forma inteligente de reduzir os riscos e aumentar seus retornos. Ao investir em ações, você pode ter maior potencial de ganhos, mas sempre se atente ao seu perfil de risco. Caso prefira algo mais seguro, os fundos imobiliários e a compra de imóveis podem ser boas opções para garantir a rentabilidade no longo prazo.
                            </div>
                        </div>
                    </div>


                </div >   
            </main>
        </>
    )
}