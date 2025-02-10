import styles from './ListagemRegistros.module.css';
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import HistoryCard from "../historyCard/HistoryCard";

export default function ListagemRegistros({ respostaAPI, setReloadAPI, reloadAPI }) {
    const [filtroSelecionado, setFiltroSelecionado] = useState('passado'); // Estado para o filtro selecionado
    const [registrosFiltrados, setRegistrosFiltrados] = useState([]); // Estado para os registros filtrados

    // Função para aplicar o filtro
    const aplicarFiltro = (registros, filtro) => {
        const hoje = new Date(); // Data atual para comparação

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
                {registrosFiltrados.map((operacao) => (
                    <HistoryCard
                        key={operacao.id_registro}
                        operacao={operacao} reloadAPI={reloadAPI} setReloadAPI={setReloadAPI}
                    />
                ))}
            </div>
        </div>
    );
}