import { useContext, useEffect, useState, useRef } from 'react';
import { Modal } from 'bootstrap';
import Header from '../../components/header/Header';
import styles from './MeuPerfil.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import SubmitButton from '../../components/forms/submitButton/SubmitButton';
import Input from '../../components/forms/input/Input';
import InputWithModal from '../../components/forms/InputWithModal/InputWithModal';
import { InputMsgErro } from '../../utils';

export default function MeuPerfil() {
    const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"];
    const [dadosUsuario, setDadosUsuario] = useState({});
    const [reload, setReload] = useState(true);
    const { signOut } = useContext(AuthContext);
    const [invalidText, setInvalidText] = useState({});
    const modalRef = useRef(null);


    useEffect(() => {
        const fetchDadosUsuario = async () => {
            fetch(`http://localhost:3005/api/usuario/${id}`)
                .then((res) => res.json())
                .then((resp) => setDadosUsuario(resp));
        };

        fetchDadosUsuario();
    }, [id, reload]);

    // Inicializa o modal de senha
    useEffect(() => {
        if (modalRef.current) {
            new Modal(modalRef.current)
        }
    }, []);

    const resetStyles = (id) => {
        document.getElementById(id).style.border = ''
        document.getElementById(id).style.outline = ''
        setInvalidText({})
    }

    const getOrCreateSenhaModal = () => {
        return Modal.getOrCreateInstance(modalRef.current);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {};
        let erros = {};

        data.senhaAnterior = event.target.senha.value;
        data.senhaNova = event.target.senhaNova.value;
        data.confirmar = event.target.confirmar.value;

        // Validações
        if (data.senhaAnterior === '') {
            erros.senha = InputMsgErro('senha', true, 'Você precisa informar a senha atual');
            setInvalidText(erros);
            return;
        }
        if (data.senhaNova === '') {
            erros.senhaNova = InputMsgErro('senhaNova', true, 'Digite uma senha');
            setInvalidText(erros);
            return;
        }
        if (data.confirmar === '') {
            erros.confirmar = InputMsgErro('senhaConfirmar', true, 'Digite sua senha novamente');
            setInvalidText(erros);
            return;
        } else if (data.senhaNova !== data.confirmar) {
            erros.confirmar = InputMsgErro('senhaConfirmar', true, 'As senhas não coincidem');
            setInvalidText(erros);
            return;
        }


        fetch(`http://localhost:3005/api/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((resp) => {
            if (resp.status === 200) {
                console.log(resp.status)
                setReload(!reload);
                getOrCreateSenhaModal().hide();
                erros.sucesso = InputMsgErro('card-senha', 'sucesso', 'Sua senha foi alterada!');
                setInvalidText(erros)
                setTimeout(() => {
                    setInvalidText('')
                }, 4000)
            } else {
                setInvalidText({
                    senha: InputMsgErro('senha', true, 'Senha atual incorreta')
                });
            }
        });
    };

    return (
        <>
            <Header />
            <main className={`card ${styles.main}`}>
                <h1 className={`pb-4 ${styles.h1}`}>Meu Perfil</h1>
                
                <div className='card col-11 col-md-9 col-lg-6 p-4 mx-auto my-2'>
                    <InputWithModal 
                        name='nome' 
                        id='nome' 
                        dadosUsuario={dadosUsuario} 
                        label='Nome' 
                        tituloModal='Alterar nome' 
                        setReload={setReload} 
                        reload={reload} 
                    />
                </div>
                
                <div className='card col-11 col-md-9 col-lg-6 p-4 mx-auto my-2'>
                    <InputWithModal 
                        name='email' 
                        id='email' 
                        dadosUsuario={dadosUsuario} 
                        label='Email' 
                        tituloModal='Alterar e-mail' 
                        setReload={setReload} 
                        reload={reload} 
                    />
                </div>

                {/* Modal de Senha */}
                <div className='card col-11 col-md-9 col-lg-6 p-4 mx-auto my-2' id='card-senha'>
                <label className="ms-3 mb-1 fw-medium fs-5">Senha</label>
                    <div className="input-group mb-3">
                        <input 
                            type='password' 
                            className="form-control" 
                            placeholder="••••••••••" 
                            disabled 
                        />
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={() => {
                                resetStyles('senha');
                                resetStyles('senhaNova');
                                resetStyles('senhaConfirmar');
                                getOrCreateSenhaModal().show();
                            }}
                        >
                            Alterar
                        </button>
                    </div>

                    <div 
                        className="modal fade" 
                        id='modal-senha' 
                        aria-hidden="true" 
                        ref={modalRef}
                    >
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Alterar Senha</h5>
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => getOrCreateSenhaModal().hide()}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <Input
                                            type='password'
                                            id='senha'
                                            name='senha'
                                            label='Senha Atual'
                                            invalidText={invalidText.senha}
                                            onChange={() => resetStyles('senha')}
                                        />
                                        <Input
                                            type='password'
                                            id='senhaNova'
                                            name='senhaNova'
                                            label='Nova Senha'
                                            invalidText={invalidText.senhaNova}
                                            onChange={() => resetStyles('senhaNova')}
                                        />
                                        <Input
                                            type='password'
                                            id='senhaConfirmar'
                                            name='confirmar'
                                            label='Confirmar Nova Senha'
                                            invalidText={invalidText.confirmar}
                                            onChange={() => resetStyles('senhaConfirmar')}
                                        />
                                        <div className="mt-4">
                                            <SubmitButton 
                                                value='Salvar Alterações' 
                                                className='w-100'
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className={styles.validMSG}>{invalidText.sucesso}</span>
                </div>
                
                <div className='exit'>
                    <SubmitButton value='Sair' onClick={signOut} className='mt-4 d-flex ms-auto px-4' />
                </div>
            </main>
        </>
    );
}