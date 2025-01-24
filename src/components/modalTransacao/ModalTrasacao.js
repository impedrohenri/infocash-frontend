import { AuthContext } from '../../contexts/AuthContext';
import Input from '../forms/input/Input'
import styles from './ModalTrasacao.module.css'
import { useContext, useState } from 'react';



export default function ModalTrasacao({ URL_API, setReloadAPI, reloadAPI }) {

	const [recorrencia, setRecorrencia] = useState('unica');
	const [selectedCategoria, setSelectedCategoria] = useState('');
    const [tipoOperacao, setTipoOperacao] = useState('');
	const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"]

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
        'Assinaturas': ['Streaming','Serviços em Nuvem', 'Softwares e Ferramentas', 'Notícias e Revistas Digitais', 'Outros'],
        'Impostos': ['IPTU', 'IPVA', 'Multas', 'Taxas Governamentais', 'Outros'],
        'Emergências': ['Serviços de Reparos Urgentes', 'Despesas Médicas Urgentes', 'Outros'],
        'Salário': ['Pagamento Mensal', 'Bônus', 'Outros'],
	}


	

	const handleSubmit = (evento) => {
		const formulario = document.getElementById("formularioOperacoes")
		evento.preventDefault();

		const formData = new FormData(formulario)
		const data = Object.fromEntries(formData)
		console.log(data)

		fetch(`http://localhost:3005/api/registro/registrar/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
			
		})
			.then(formulario.reset(),
				setReloadAPI(!reloadAPI),
				console.log(data)
			)
	}

	return (
		<>
			<div className={`ms-4 mt-4`}>
				<button type="button" className={`btn btn-secondary btn-lg ${styles.botaoDiv}`} data-bs-toggle="modal" data-bs-target="#modalTransacao">
					+ Operação
				</button>
			</div>

			<div className={`modal fade ${styles.modal1}`} id="modalTransacao" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">

				<form className="modal-dialog modal-dialog-scrollable modal-dialog-centered" id='formularioOperacoes' onSubmit={handleSubmit}>
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="modalLabel">Adicionar Operação</h1>
							<input type="reset" className="btn btn-close" data-bs-dismiss="modal" aria-label="close" value=' ' />
						</div>

						{/* FORMULÁRIO DE TRANSAÇÃO */}
						<div className={`modal-body ${styles.modalBody}`}>

							{/* Tipo de operação */}
							<div className='d-flex justify-content-around mb-4 mt-2'>
								<label className={`${styles.tipoOperacao}`} htmlFor='operacaoEntrada'>Entrada
									<input type='radio' className='' name='tipo' id='operacaoEntrada' value='entrada' required onChange={() => {setTipoOperacao('entrada'); setSelectedCategoria('')}} />
								</label>

								<label className={`${styles.tipoOperacao}`} htmlFor='operacaoSaida'>Saída
									<input type='radio' className='' name='tipo' id='operacaoSaida' value='saida' required onChange={() => {setTipoOperacao('saida'); setSelectedCategoria('')}} />
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
                                .filter((cat) => tipoOperacao !== 'entrada'? cat !== 'Salário': cat === 'Salário')
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
										{categorias_e_subs[selectedCategoria].map(cat => <option value={cat}>{cat}</option>)}
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
												<input type="radio" name="periodoRecorrencia" id={periodo} value={periodo} required/> {periodo}
											</label>
										))}
									</div>
								)}
							</div>
						</div>

						<div className="modal-footer">
							<button type='submit' htmlFor='formularioModal' className='btn btn-dark'>Confirmar</button>
						</div>

					</div>
				</form>
			</div>
		</>
	)
}