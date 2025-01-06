import Input from '../forms/input/Input'
import styles from './ModalTrasacao.module.css'
import { useState } from 'react';



export default function ModalTrasacao({ setReloadAPI, reloadAPI }) {

	const [recorrencia, setRecorrencia] = useState('unica');
	const [selectedCategoria, setSealectedCategoria] = useState('')


	const categorias_e_subs = {
		'Alimentação': ['Supermercado', 'Restaurantes', 'Lanches', 'Bebidas'],
		'Educação': ['Cursos', 'Livros', 'Material Escolar', 'Mensalidade'],
		'Lazer': ['Viagens', 'Cinema', 'Eventos', 'Jogos'],
		'Saúde': ['Consultas', 'Medicamentos', 'Exames', 'Plano de Saúde'],
		'Investimentos': ['Ações', 'Poupança', 'Fundos Imobiliários', 'Criptomoedas'],
		'Transporte': ['Combustível', 'Transporte Público', 'Estacionamento', 'Manutenção'],
		'Cuidados Pessoais': ['Cosméticos', 'Salão de Beleza', 'Academia', 'Higiene Pessoal'],
	}


	const formulario = document.getElementById("formularioOperacoes")

	const handleSubmit = (evento) => {
		evento.preventDefault();

		const formData = new FormData(formulario)
		const data = Object.fromEntries(formData)
		console.log(data)

		fetch('URL_DA_API', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(formulario.reset(),
				setReloadAPI(!reloadAPI)
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
									<input type='radio' className='' name='tipoOperacao' id='operacaoEntrada' value='entrada' required />
								</label>

								<label className={`${styles.tipoOperacao}`} htmlFor='operacaoSaida'>Saída
									<input type='radio' className='' name='tipoOperacao' id='operacaoSaida' value='saida' required />
								</label>
							</div>

							{/* Título da operação */}
							<Input type='text' name='titulo' label='Título' placeholder='Título da operação' required='required' />

							{/* Valor da operação */}
							<Input type='number' name='valor' label='Valor' placeholder='R$ 0.000,00' min="0" step="0.01" />

							{/* Categorias da operação */}
							<label htmlFor="selectCategoria">Categoria</label>
							<select className="form-select my-2" name='categoria' id="selectCategoria" onChange={() => { setSealectedCategoria(document.getElementById("selectCategoria").value) }} required>
								<option selected></option>
								{Object.keys(categorias_e_subs).map(cat => <option value={cat}>{cat}</option>)}
							</select>

							{/* Subcategorias da Operação */}
							{selectedCategoria !== '' && (
								<>
									<label htmlFor="selectSubcategoria">Subcategoria</label>
									<select className="form-select my-2" name='subCategoria' id="selectSubcategoria" required>
										<option selected></option>
										{categorias_e_subs[selectedCategoria].map(cat => <option value={cat}>{cat}</option>)}
									</select>
								</>
							)}

							{/* Data da operação */}
							<Input type='date' name='data' label='Data' required />


							<h5>Recorrência:</h5>
							<div className={`d-flex row justify-content-around py-4 mx-1 ${styles.divRadios}`}>

								<label className={`${styles.recorrencia}`} htmlFor='unica_id'>
									<input className="my-auto" type="radio" name="recorrencia" id="unica_id" value='unica' checked={recorrencia === 'unica'} onChange={(e) => { setRecorrencia(e.target.value); }} defaultChecked />Operação única
								</label>

								<label className={`${styles.recorrencia}`} htmlFor='recorrente_id'>
									<input className="my-auto" type="radio" name="recorrencia" id="recorrente_id" value='recorrente' checked={recorrencia === 'recorrente'} onChange={(e) => { setRecorrencia(e.target.value); }} />
									Operação recorrente
								</label>


								{recorrencia === 'recorrente' && (
									<div className={`${styles.periodos_container}`}>
										{["Semanal", "Quinzenal", "Mensal", "Semestral", "Anual"].map(periodo => (
											<label className={`${styles.periodos}`} htmlFor={periodo}>
												<input type="radio" name="periodoRecorrencia" id={periodo} value={periodo} /> {periodo}
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