import { useState } from 'react';
import styles from './FormRegistro.module.css'
import Input from '../input/Input';

export default function FormRegistro(props) {
    const [recorrencia, setRecorrencia] = useState('unica');
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [tipoOperacao, setTipoOperacao] = useState('');

    const categorias_e_subs = {
        'Alimentação': ['Supermercado', 'Restaurantes', 'Lanches', 'Bebidas', 'Delivery', 'Padaria', 'Outros'],
        'Moradia': ['Aluguel', 'Condomínio', 'Manutenção', 'Outros'],
        'Transporte': ['Combustível', 'Transporte Público', 'Estacionamento', 'Manutenção de Veículo', 'Táxi/App de Transporte', 'Outros'],
        'Saúde': ['Consultas Médicas', 'Medicamentos', 'Exames', 'Plano de Saúde', 'Terapias', 'Emergências', 'Outros'],
        'Educação': ['Mensalidades Escolares', 'Cursos', 'Livros Didáticos', 'Material Escolar', 'Outros'],
        'Lazer': ['Viagens', 'Cinema', 'Eventos', 'Jogos', 'Passeios', 'Outros'],
        'Investimentos': ['Poupança', 'Ações', 'Fundos Imobiliários', 'Criptomoedas', 'Tesouro Direto', 'Outros'],
        'Despesas Domésticas': ['Energia Elétrica', 'Água', 'Gás', 'Internet', 'Produtos de Limpeza', 'Utensílios Domésticos', 'Outros'],
        'Pets': ['Veterinário', 'Ração/Alimentos', 'Brinquedos', 'Acessórios', 'Banho e Tosa', 'Outros'],
        'Cuidados Pessoais': ['Cosméticos', 'Salão de Beleza', 'Academia', 'Higiene Pessoal', 'Barbearia', 'Outros'],
        'Assinaturas': ['Streaming', 'Serviços em Nuvem', 'Softwares e Ferramentas', 'Notícias e Revistas Digitais', 'Outros'],
        'Impostos': ['IPTU', 'IPVA', 'Multas', 'Taxas Governamentais', 'Outros'],
        'Emergências': ['Serviços de Reparos Urgentes', 'Despesas Médicas Urgentes', 'Outros'],
        'Salário': ['Pagamento Mensal', 'Bônus', 'Outros'],
    }

    return (
        
            <form id={props.id} onSubmit={props.onSubmit} className={`modal-body ${styles.modal_Body}`}>

                {/* Tipo de operação */}
                <div className='d-flex justify-content-around mb-4 mt-2'>
                    <label className={`${styles.tipoOperacao}`} htmlFor='operacaoEntrada'>Entrada
                        <input type='radio' className='' name='tipo' id='operacaoEntrada' value='entrada' required onChange={() => { setTipoOperacao('entrada'); setSelectedCategoria('') }} />
                    </label>

                    <label className={`${styles.tipoOperacao}`} htmlFor='operacaoSaida'>Saída
                        <input type='radio' className='' name='tipo' id='operacaoSaida' value='saida' required onChange={() => { setTipoOperacao('saida'); setSelectedCategoria('') }} />
                    </label>
                </div>

                {/* Título da operação */}
                <Input type='text' name='titulo' label='Título' placeholder='Título da operação' required='required' />

                {/* Valor da operação */}
                <Input type='number' name='valor' label='Valor' placeholder='R$ 0.000,00' min="0" step="0.01" />

                {/* Categorias da operação */}
                <label htmlFor="selectCategoria">Categoria</label>
                <select className="form-select my-2" name='categoria' id="selectCategoria" onChange={() => { setSelectedCategoria(document.getElementById("selectCategoria").value) }} required>
                    <option defaultValue></option>
                    {Object.keys(categorias_e_subs)
                        .filter((cat) => tipoOperacao === 'saida' ? cat !== 'Salário' : cat === 'Salário')
                        .map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                </select>

                {/* Subcategorias da Operação */}
                {selectedCategoria !== '' && (
                    <>
                        <label htmlFor="selectSubcategoria">Subcategoria</label>
                        <select className="form-select my-2" name='subcategoria' id="selectSubcategoria" required>
                            <option defaultValue></option>
                            {categorias_e_subs[selectedCategoria].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </>
                )}

                {/* Data da operação */}
                <Input type='date' name='data' label='Data' required />


                <h5>Recorrência:</h5>
                <div className={`d-flex row justify-content-around py-4 mx-1 ${styles.divRadios}`}>

                    <label className={`${styles.recorrencia}`} htmlFor='unica_id'>
                        <input className="my-auto" type="radio" name="recorrencia" id="unica_id" value='nao' checked={recorrencia === 'nao'} onChange={(e) => { setRecorrencia(e.target.value); }} />Operação única
                    </label>

                    <label className={`${styles.recorrencia}`} htmlFor='recorrente_id'>
                        <input className="my-auto" type="radio" name="recorrencia" id="recorrente_id" value='sim' checked={recorrencia === 'sim'} onChange={(e) => { setRecorrencia(e.target.value); }} />
                        Operação recorrente
                    </label>


                    {recorrencia === 'sim' && (
                        <div className={`${styles.periodos_container}`}>
                            {["Semanal", "Mensal", "Anual"].map(periodo => (
                                <label className={`${styles.periodos}`} htmlFor={periodo}>
                                    <input type="radio" name="periodoRecorrencia" id={periodo} value={periodo} required /> {periodo}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </form>
        
    )
}