import styles from './Home.module.css'
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import GraficoMeta from '../../components/graficos/graficoMeta/GraficoMeta';
import ModalTrasacao from '../../components/modalTransacao/ModalTrasacao';
import HistoryCard from '../../components/historyCard/HistoryCard';

export default function Home() {

  const [totalSaldo, setTotalSaldo] = useState(0);
  const [totalEntrada, setTotalEntrada] = useState(0);
  const [totalSaida, setTotalSaida] = useState(0);
  const [respostaAPI, setRespostaAPI] = useState([])
  const [reloadAPI, setReloadAPI] = useState(false)
  const [dadosUsuario, setDadosUsuario] = useState({})

  const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"]

  useEffect(() => {
    fetch(`http://localhost:3005/api/registro/${id}`)
      .then(
        resposta => { return resposta.json() }
      )
      .then(
        res => {
          setRespostaAPI(res)
          console.log(res)

          const entrada = res
            .filter(operacao => operacao.tipo === 'entrada')
            .reduce((total, operacao) => total + parseFloat(operacao.valor), 0);

          const saida = res
            .filter(operacao => operacao.tipo === 'saida')
            .reduce((total, operacao) => total + parseFloat(operacao.valor), 0);


          setTotalEntrada(entrada);
          setTotalSaida(saida);
          setTotalSaldo(entrada - saida);

          fetch(`http://localhost:3005/api/conta/buscar/${id}`)
            .then((res) => { return res.json() })
            .then((resp) => {setDadosUsuario(resp);
                  console.log(resp)}
          )

        }
      )
      .catch(err => console.log(err))
  }, [reloadAPI])

  return (
    <>
      <Header />
      <div className={`mt-4 ${styles.upperBody}`}>

        <div className={`col-11 col-md-5 row m-3 mx-auto ${styles.mainValues} `}>
          <div className={`card mb-2 text-center ${styles.primaryValue}`}>
            <div className="card-body">
              <h3 className="card-title">Saldo total</h3>
              <p className="card-text">R$ {dadosUsuario.saldo}</p>
            </div>
          </div>

          <div className={`card ${styles.secundaryValue}`}>
            <div className="card-body">
              <h3 className="card-title">Entradas</h3>
              <p className="card-text">R$ {dadosUsuario.renda}</p>
            </div>
          </div>

          <div className={`card ${styles.secundaryValue}`}>
            <div className="card-body">
              <h3 className="card-title">Saídas</h3>
              <p className="card-text">R$ {dadosUsuario.gasto}</p>
            </div>
          </div>

          <ModalTrasacao reloadAPI={reloadAPI} setReloadAPI={setReloadAPI} />
        </div>

        <GraficoMeta respostaAPI={respostaAPI} />
      </div>

      <div className={` ${styles.history_container}`}>
        <h2 className='p-4'>Registros</h2>
        <div className={`d-flex ${styles.history}`}>
          {respostaAPI.map(( operacao, index) => (new Date(operacao.data).getTime() <= new Date().getTime()) && <HistoryCard key={index} operacao={operacao} />)}
        </div>
      </div>
    </>
  );
}
