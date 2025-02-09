import { Modal } from 'bootstrap';
import Input from "../input/Input";
import SubmitButton from "../submitButton/SubmitButton";
import { useRef, useState } from 'react';
import { InputMsgErro } from '../../../utils';

export default function InputWithModal({ setReload, reload, name, id, ...props }) {
    const id_usuario = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"];
    const dadosUsuario = props.dadosUsuario;
    const modalRef = useRef(null);
    const [invalidText, setInvalidText] = useState({});

    const resetStyles = (id) => {
        document.getElementById(id)?.style?.setProperty('border', '', 'important');
        document.getElementById(id)?.style?.setProperty('outline', '', 'important');
        setInvalidText({});
    };

    const getOrCreateModal = () => {
        return Modal.getOrCreateInstance(modalRef.current); // Sempre retorna uma instância válida
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {};
        let erros = {};

        // Validação do campo
        const novoValor = event.target[name].value.trim();
        if (novoValor === '') {
            erros[name] = InputMsgErro(id, true, `O campo ${props.label} não pode estar vazio`);
            setInvalidText(erros);
            return;
        }

        // Prepara os dados para a requisição
        data.id = dadosUsuario.id_usuario;
        data.nome = dadosUsuario.nome;
        data.email = dadosUsuario.email;
        data.senhaAnterior = dadosUsuario.senha;
        data.senhaNova = dadosUsuario.senha;
        data.confirmar = dadosUsuario.senha;
        data[name] = novoValor;

        // Envia a requisição
        fetch(`http://localhost:3005/api/usuario/${id_usuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((resp) => {
            console.log(resp.status)
            if (resp.status === 200) {
                setReload(!reload);
                // Fechar o modal corretamente
                getOrCreateModal().hide();
            } else {
                erros[name] = InputMsgErro(name, true, 'Erro ao atualizar o campo');
                setInvalidText(erros);
            }
        })
        .catch((error) => {
            console.error('Erro na requisição:', error);
            erros[name] = InputMsgErro(name, true, 'Erro na conexão com o servidor');
            setInvalidText(erros);
        });
    };

    return (
        <>
            <label className="ms-3 mb-1 fw-medium fs-5">{props.label}</label>
            <div className="input-group mb-3">
                <input
                    type={props.type}
                    maxLength={props.maxLength || "100"}
                    className="form-control"
                    placeholder={props.placeholder || "Digite um valor"}
                    defaultValue={dadosUsuario[name]}
                    disabled
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => {
                        resetStyles(id); // Reseta estilos ao abrir
                        getOrCreateModal().show(); // Abre o modal garantindo uma nova instância
                    }}
                >
                    Alterar
                </button>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id={`modal-${name}`}
                tabIndex="-1"
                aria-labelledby="modalLabel"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalLabel">{props.tituloModal}</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body px-4 d-flex flex-column">
                            <form onSubmit={handleSubmit}>
                                <Input
                                    id={id}
                                    type={props.type}
                                    name={name}
                                    label={props.labelModal || `Digite o novo ${props.label.toLowerCase()}`}
                                    invalidText={invalidText[name]}
                                    onChange={() => resetStyles(id)}
                                />
                                <SubmitButton className='w-100 mt-0 ms-auto' value='Salvar' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}