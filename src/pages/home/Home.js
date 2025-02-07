import styles from './Home.module.css'
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import GraficoMeta from '../../components/graficos/graficoMeta/GraficoMeta';
import ModalTrasacao from '../../components/modalTransacao/ModalTrasacao';
import HistoryCard from '../../components/historyCard/HistoryCard';
import ApiErrorMsg from '../../components/apiErrorMsg/ApiErrorMsg';

export default function Home() {

  const [respostaAPI, setRespostaAPI] = useState([])
  const [reloadAPI, setReloadAPI] = useState(false)
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [registrosOrdenados, setRegistrosOrdenados] = useState([])
  const [statusAPI, setStatusAPI] = useState('')

  const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"]

  const ordenarRegistros = (res) => {
    return [...res].sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);

      if (dateB > dateA) return 1;
      if (dateB < dateA) return -1;

      return b.id_registro - a.id_registro;
    });
  };

  useEffect(() => {

    fetch(`http://localhost:3005/api/conta/buscar/${id}`)
      .then((res) => { 
        
        return res.json() })
      .then((resp) => {setDadosUsuario(resp);
            console.log(resp)}
    )

    fetch(`http://localhost:3005/api/registro/${id}`)
      .then(
        (resposta) => { 
          setStatusAPI(resposta.status)
          return resposta.json() }
      )
      .then(
        (res) => {
          setRespostaAPI(res);
          const sorted = ordenarRegistros(res);
          setRegistrosOrdenados(sorted);
        }
      )
      .catch(err => console.log(err))
      
      console.log(statusAPI)
    }, [reloadAPI, id])
    return (
    <>
      {statusAPI === 404 && <ApiErrorMsg status={statusAPI}/>}
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
          {(registrosOrdenados.length !== 0) && registrosOrdenados.map(( operacao, index) => (new Date(operacao.data).getTime() <= new Date().getTime()) ? <HistoryCard key={index} operacao={operacao} /> : false)}
          {console.log(registrosOrdenados)}
        </div>
      </div>
    </>
  );
}
