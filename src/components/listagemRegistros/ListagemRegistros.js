import styles from './ListagemRegistros.module.css';
import { useEffect, useState } from "react";
import { Card, Dropdown, Placeholder } from "react-bootstrap";
import HistoryCard from "../historyCard/HistoryCard";

export default function ListagemRegistros({statusAPI, respostaAPI, setReloadAPI, reloadAPI }) {
    const [filtroSelecionado, setFiltroSelecionado] = useState('passado'); // Estado para o filtro selecionado
    const [registrosFiltrados, setRegistrosFiltrados] = useState([]); // Estado para os registros filtrados

    // Função para aplicar o filtro
    const aplicarFiltro = (registros, filtro) => {
        const hoje = new Date() - 3 * 60 * 60 * 1000; // Data atual para comparação

        switch (filtro) {
            case 'futuro':
                return registros.filter(registro =>
                    !registro.processado && new Date(registro.data) > hoje
                );
            case 'passado':
                return registros.filter(registro =>
                    registro.processado || new Date(registro.data) <= hoje
                );
            default:
                return registros; // Retorna todos os registros se o filtro for 'todos'
        }
    };

    // Função para ordenar os registros por data
    const ordenarRegistros = (registros) => {
        return [...registros].sort((a, b) => {
            const dateA = new Date(a.data);
            const dateB = new Date(b.data);
            return dateB - dateA; // Ordena do mais recente para o mais antigo
        });
    };

    // Atualiza os registros filtrados sempre que o filtro ou a resposta da API mudar
    useEffect(() => {
        const registrosFiltrados = aplicarFiltro(respostaAPI, filtroSelecionado);
        const registrosOrdenados = ordenarRegistros(registrosFiltrados);
        setRegistrosFiltrados(registrosOrdenados); // Atualiza o estado com os registros filtrados e ordenados
    }, [respostaAPI, filtroSelecionado]);


    return (
        <div className={`${styles.registros_container}`}>
            <div className='d-flex justify-content-between align-items-center'>
                <h2 className='p-4'>Registros</h2>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary">
                        Filtrar
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-dark">
                        <Dropdown.Item onClick={() => setFiltroSelecionado('futuro')}>
                            Registros Futuros
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setFiltroSelecionado('passado')}>
                            Registros Passados
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setFiltroSelecionado('todos')}>
                            Todos
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className={`d-flex ${styles.registros}`}>
                {((respostaAPI === false) || (statusAPI !== 404)) ?
                    registrosFiltrados.map((operacao) => (
                        <HistoryCard
                            key={operacao.id_registro}
                            operacao={operacao} reloadAPI={reloadAPI} setReloadAPI={setReloadAPI}
                        />
                    )) :
                    [1, 2, 3].map((i) => (
                        <div className='col-12 col-lg-4 col-md-6 p-2'>
                        <Card className='p-3 col-12'>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={5} /> <Placeholder xs={3} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={3} /> <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder.Button variant="secondary" xs={4} className='d-flex ms-auto py-3 my-0' />
                            </Card.Body>
                        </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}