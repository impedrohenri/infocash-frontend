import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Header from '../../components/header/Header';
import styles from './MeuPerfil.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import SubmitButton from '../../components/forms/submitButton/SubmitButton';
import Input from '../../components/forms/input/Input';
import InputWithModal from '../../components/forms/InputWithModal/InputWithModal';
import { InputMsgErro } from '../../utils';
import { Button } from 'react-bootstrap';

export default function MeuPerfil() {
    const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"];
    const [dadosUsuario, setDadosUsuario] = useState({});
    const [reload, setReload] = useState(true);
    const { signOut } = useContext(AuthContext);
    const [invalidText, setInvalidText] = useState({});

    const [showSenhaModal, setShowSenhaModal] = useState(false);
    const [showDeletarModal, setShowDeletarModal] = useState(false);

    const handleCloseSenhaModal = () => setShowSenhaModal(false);
    const handleShowSenhaModal = () => setShowSenhaModal(true);

    const handleCloseDeletarModal = () => setShowDeletarModal(false);
    const handleShowDeletarModal = () => setShowDeletarModal(true);

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            fetch(`http://localhost:3005/api/usuario/${id}`)
                .then((res) => res.json())
                .then((resp) => setDadosUsuario(resp));
        };

        fetchDadosUsuario();
    }, [id, reload]);


    const resetStyles = (id) => {
        document.getElementById(id).style.border = ''
        document.getElementById(id).style.outline = ''
        setInvalidText({})
    }


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
                handleCloseSenhaModal()
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

    const handleDelete = (event) => {
        event.preventDefault()
        console.log('chegou')
        const senha = event.target.deletarSenha.value;
        const data = {}
        data.id_usuario = id
        data.senha = senha
        let erros = {};

        if(senha === '') {
            erros.deletarSenha = InputMsgErro('deletarSenha', true, 'Você precisa informar sua senha.');
            setInvalidText(erros);
            return;
        }

        fetch(`http://localhost:3005/api/usuario/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((resp) => {
            if (resp.status === 200) {
                console.log(resp.status)
                erros.deletarSenha = InputMsgErro('deletarSenha', 'sucesso', 'Sua conta foi deletada. Você será redirecionado!');
                setInvalidText(erros)
                setTimeout(() => {
                    handleCloseDeletarModal()
                    signOut()
                }, 4000)
            } else {
                erros.deletarSenha = InputMsgErro('deletarSenha', true, 'Senha incorreta. Tem certeza que deseja prosseguir?');
                setInvalidText(erros);
                return;
            }
        });
    }

    return (
        <>
            <Header />
            <main className={`card ${styles.main}`}>
                <h1 className={`pb-4 ${styles.h1}`}>Meu Perfil</h1>

                <div className='card col-11 col-md-9 col-lg-6 p-4 mx-auto my-2'>
                    <InputWithModal name='nome' id='nome' dadosUsuario={dadosUsuario} label='Nome' tituloModal='Alterar nome' setReload={setReload} reload={reload} />
                </div>

                <div className='card col-11 col-md-9 col-lg-6 p-4 mx-auto my-2'>
                    <InputWithModal name='email' id='email' dadosUsuario={dadosUsuario} label='Email' tituloModal='Alterar e-mail' setReload={setReload} reload={reload} />
                </div>

                {/* Modal de Senha */}
                <div className='card col-11 col-md-9 col-lg-6 p-4 mx-auto my-2' id='card-senha'>
                    <label className="ms-3 mb-1 fw-medium fs-5">Senha</label>
                    <div className="input-group mb-3">
                        <input type='password' className="form-control" placeholder="••••••••••" disabled />
                        <Button variant="outline-secondary" onClick={handleShowSenhaModal}>
                            Alterar
                        </Button>
                    </div>

                    <Modal aria-labelledby="modalSenha" size="lg" show={showSenhaModal} onHide={handleCloseSenhaModal} centered>
                        <Modal.Header id='modalSenha' closeButton>
                            <Modal.Title>Alterar senha</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                <Input type='password' id='senha' name='senha' label='Senha Atual' invalidText={invalidText.senha} onChange={() => resetStyles('senha')} />
                                <Input type='password' id='senhaNova' name='senhaNova' label='Nova Senha' invalidText={invalidText.senhaNova} onChange={() => resetStyles('senhaNova')} />
                                <Input type='password' id='senhaConfirmar' name='confirmar' label='Confirmar Nova Senha' invalidText={invalidText.confirmar} onChange={() => resetStyles('senhaConfirmar')} />
                                <div className="mt-4">
                                    <SubmitButton value='Salvar Alterações' className='w-100' />
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <span className={styles.validMSG}>{invalidText.sucesso}</span>
                </div>

                {/* Modal deletar usuario */}

                <div className='exit w-100 d-fles justify-content-between'>
                    <div>


                        <Modal aria-labelledby="modalDeletarConta" size="lg" show={showDeletarModal} onHide={handleCloseDeletarModal} centered>
                            <Modal.Header id='modalDeletarConta' closeButton>
                                <Modal.Title className='gap-2'><img src='/img/icons/card_delete.png' height='30' alt='' className='me-2' />Deletar conta</Modal.Title>
                            </Modal.Header>
                            <form id='formDeletar' onSubmit={handleDelete}>
                                <Modal.Body>
                                    <p className='fs-5 fw-medium text-danger'>Tem certeza que deseja excluir sua conta? Essa ação é irreversível!</p>
                                    <span>Para prosseguir é necessário que digite sua senha.</span>
                                    <Input type='password' name='deletarSenha' id='deletarSenha' placeholder='Sua senha' invalidText={invalidText.deletarSenha} onChange={() => resetStyles('deletarSenha')} />

                                </Modal.Body>
                                <Modal.Footer>
                                    <SubmitButton htmlFor='formDelete' value='Deletar' />
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                    <div className='d-flex'><Button className='py-2 d-flex align-items-center gap-2 mt-4' variant="outline-danger" onClick={handleShowDeletarModal}>
                        <img src='/img/icons/card_delete.png' height='20' alt='' />Excluir conta
                    </Button>
                        <SubmitButton value='Sair' onClick={signOut} className='mt-4 d-flex ms-auto px-4' />
                    </div>
                </div>

            </main>
        </>
    );
}