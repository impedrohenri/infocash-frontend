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

  useEffect(() => {
    fetch(`URL_DA_API`)
      .then(
        resposta => { return resposta.json() }
      )
      .then(
        res => {
          setRespostaAPI(res)
          console.log(res)
        }
      )
      .catch(err => console.log(err))
  }, [])


  return (
    <>
      <Header />
      <div className={`mt-4 ${styles.upperBody}`}>

        <div className={`col-11 col-md-6 row m-3 mx-auto ${styles.mainValues} `}>

          <div className={`card mb-2 text-center ${styles.primaryValue}`}>
            <div className="card-body">
              <h3 className="card-title">Saldo total</h3>
              <p className="card-text">R$ {totalSaldo}</p>
            </div>
          </div>

          <div className={`card ${styles.secundaryValue}`}>
            <div className="card-body">
              <h3 className="card-title">Entradas</h3>
              <p className="card-text">R$ {totalEntrada}</p>
            </div>
          </div>

          <div className={`card ${styles.secundaryValue}`}>
            <div className="card-body">
              <h3 className="card-title">Saídas</h3>
              <p className="card-text">R$ {totalSaida}</p>
            </div>
          </div>

          <ModalTrasacao />
        </div>

        <GraficoMeta />

      </div>

      <div>
        <div className={`d-flex mx-auto mt-3 px-1 ${styles.history}`}>
          <h2 className=''>Registros</h2>
          {respostaAPI.map(operacao => <HistoryCard instancia={operacao} />)}
        </div>
      </div>
    </>
  );
}
