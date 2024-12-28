import Input from '../forms/input/Input'
import styles from './ModalTrasacao.module.css'
import { useState } from 'react';

export default function ModalTrasacao() {

	const [recorrencia, setRecorrencia] = useState('unica');
	const [buttonEntrada, setButtonEntrada] = useState('outline-')
	const [buttonSaida, setButtonSaida] = useState('outline-')
	

	const handleChange = (e) => {
		setRecorrencia(e.target.value);
	}


	return (
		<>

			<div className={`ms-4 mt-4`}>
				<button type="button" class={`btn btn-secondary btn-lg ${styles.botaoDiv}`} data-bs-toggle="modal" data-bs-target="#modalTransacao">
					+ Transação
				</button>
			</div>


			<div class={`modal fade ${styles.modal1}`} id="modalTransacao" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-scrollable">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="modalLabel">Adicionar Operação</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						{/* <form id='formularioModal'> */}
						<div class={`modal-body ${styles.modalBody}`}>

							<div className='d-flex justify-content-around mb-4 mt-2'>
								<div>
								<label className={`btn btn-${buttonEntrada}success`} htmlFor='operacaoEntrada'>Entrada</label>
								<input type='radio' className='invisible' name='tipoOperacao' id='operacaoEntrada' onChange={() => {setButtonEntrada(''); setButtonSaida('outline-')}}/>
								</div>


								<div>
								<label className={`btn btn-${buttonSaida}danger px-3`} htmlFor='operacaoSaida'>Saída</label>
								<input type='radio' className='invisible' name='tipoOperacao' id='operacaoSaida' onChange={() => {setButtonSaida(''); setButtonEntrada('outline-')}} />
								</div>
							</div>

							<Input type='text' label='Título' placeholder='Título da operação' required='required' />
							<Input type='number' label='Valor' placeholder='R$ 0.000,00' />

							<label for="floatingSelect">Categoria</label>
							<select class="form-select my-2" id="floatingSelect" required>
								<option selected></option>
								<option value="1">Alimentação</option>
								<option value="2">Educação</option>
								<option value="3">Lazer</option>
								<option value="4">Saúde</option>
								<option value="5">Investimentos</option>
								<option value="6">Transporte</option>
								<option value="7">Cuidados Pessoais</option>
								<option value="8">João Victor</option>
							</select>

							<Input type='date' label='Data' required />


							<h5>Recorrência:</h5>
							<div className={`d-flex row justify-content-around py-4 mx-1 ${styles.divRadios}`}>
								<div className='col-6'>
									<label htmlFor='unica_id'>
										<input class="form-check-input me-2" type="radio" name="recorrencia" id="unica_id" value='unica' checked={recorrencia === 'unica'} onChange={handleChange} defaultChecked />Operação única
									</label>
								</div>

								<div className='col-6'>
									<label htmlFor='recorrente_id'>
										<input class="form-check-input me-2" type="radio" name="recorrencia" id="recorrente_id" value='recorrente' checked={recorrencia === 'recorrente'} onChange={handleChange} />
										Operação recorrente
									</label>
								</div>


								{recorrencia === 'recorrente' && (
									<div className='col-10 my-4'>
										<div id="selecionarPeriodo" class="carousel slide" data-bs-theme="dark">
											<div class={`carousel-inner mt-4 ${styles.periodos}`}>
												<div class='carousel-item active text-center my-2'>
													<span className='fw-semibold fs-5'>mensal</span>
												</div>
												<div class="carousel-item text-center my-2">
													<span className='fw-semibold fs-5'>anual</span>
												</div>
												<div class="carousel-item text-center my-2">
													<span className='fw-semibold fs-5'>semestral</span>
												</div>
											</div>
											<button class="carousel-control-prev ms-2" type="button" data-bs-target="#selecionarPeriodo" data-bs-slide="prev">
												<span class="carousel-control-prev-icon" aria-hidden="true"></span>
												<span class="visually-hidden">Previous</span>
											</button>
											<button class="carousel-control-next me-2" type="button" data-bs-target="#selecionarPeriodo" data-bs-slide="next">
												<span class="carousel-control-next-icon" aria-hidden="true"></span>
												<span class="visually-hidden">Next</span>
											</button>
										</div>
									</div>
								)}
							</div>

						</div>
						{/* </form> */}
						<div class="modal-footer">
							<button type='submit' htmlFor='formularioModal' className='btn btn-dark'>Confirmar</button>
						</div>



					</div>
				</div>
			</div>
		</>
	)
}