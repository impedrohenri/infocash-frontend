import styles from './Home.module.css'
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import GraficoMeta from '../../components/graficos/graficoMeta/GraficoMeta';
import ModalTrasacao from '../../components/modalTransacao/ModalTrasacao';
import ApiErrorMsg from '../../components/apiErrorMsg/ApiErrorMsg';
import ListagemRegistros from '../../components/listagemRegistros/ListagemRegistros';
import API from '../../routes/api';

export default function Home() {

  const [respostaAPI, setRespostaAPI] = useState([])
  const [reloadAPI, setReloadAPI] = useState(false)
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [statusAPI, setStatusAPI] = useState('')

  const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"]

  

  useEffect(() => {

    // Aqui busca os dados do usuário e seta no state
    fetch(API + `/conta/buscar/${id}`)
      .then((resposta) => {
        if(resposta.status === 404){
          setStatusAPI(resposta.status)
        }
        return resposta.json()
      })
      .then((resp) => {
        setDadosUsuario(resp);
      }
      )

    // Aqui busca os registros e seta no state já ordenado por data
    fetch(API +  `/registro/${id}`)
      .then(
        (resposta) => {
          if(resposta.status === 404){
            setStatusAPI(resposta.status)
          }
          return resposta.json()
        }
      )
      .then(
        (res) => {
          setRespostaAPI(res);
        }
      )
      .catch(err => console.log(err))

  }, [reloadAPI, id, statusAPI])
  return (
    <>
      {statusAPI === 404 && <ApiErrorMsg status={statusAPI} />}
      <Header />
      <div className={`mt-4 ${styles.upperBody}`}>

        <div className={`col-11 col-lg-4 row mx-auto mt-3 gap-2 ${styles.mainValues} `}>
          <div className={`card text-center ${styles.primaryValue}`}>
            <div className="card-body">
              <h4 className="card-title">Saldo total</h4>
              <p className="card-text">R$ {dadosUsuario.saldo}</p>
            </div>
          </div>

          <div className={`card col  text-center ${styles.secundaryValue}`}>
            <div className="card-body">
              <h4 className="card-title">Entradas</h4>
              <p className="card-text">R$ {dadosUsuario.renda}</p>
            </div>
          </div>

          <div className={`card col text-center ${styles.secundaryValue}`}>
            <div className="card-body">
              <h4 className="card-title">Saídas</h4>
              <p className="card-text">R$ {dadosUsuario.gasto}</p>
            </div>
          </div>

          <ModalTrasacao reloadAPI={reloadAPI} setReloadAPI={setReloadAPI} />
        </div>

        <GraficoMeta respostaAPI={respostaAPI} />
      </div>

      <ListagemRegistros respostaAPI={respostaAPI} reloadAPI={reloadAPI} setReloadAPI={setReloadAPI} statusAPI={statusAPI}/>
    </>
  );
}
