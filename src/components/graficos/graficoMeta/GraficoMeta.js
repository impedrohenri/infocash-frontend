import styles from './GraficoMeta.module.css';
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import Popover from '../../popover/Popover';

export default function GraficoMeta(props) {
  const [limiteMensal, setLimiteMensal] = useState(0);
  const [limiteRestante, setLimiteRestante] = useState(0);
  const id = JSON.parse(localStorage.getItem('@Auth:user'))["id_usuario"];

  useEffect(() => {
    fetch(`http://localhost:3005/api/conta/meta/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLimiteMensal(parseFloat(data).toFixed(2));
      });
  }, [id]);

  useEffect(() => {
    const categoriasSaida = [
      ...new Set(
        props.respostaAPI
          .filter(operacao => operacao.tipo === "saida")
          .map(operacao => String(operacao.categoria))
      )
    ];

    const dadosGrafico = (resJSON, categorias) => {
      let data = [];
      for (let cat of categorias) {
        let lista = [];
        resJSON.forEach(operacao => (new Date(operacao.data).getTime() <= new Date().getTime()) && (operacao.categoria === cat) && (operacao.tipo === "saida") && lista.push(parseFloat(operacao.valor)));
        data.push(lista.reduce((valorAnterior, valor) => (valorAnterior + valor), 0));
      }
      return data;
    };

    const calcularLimiteRestante = (dados, limite) => {
      const totalGasto = dados.reduce((acc, valor) => parseFloat(acc + valor), 0);
      return Math.max(0, parseFloat(limite - totalGasto));
    };

    const ctx = document.getElementById('grafico');
    if (Chart.getChart('grafico')) Chart.getChart('grafico').destroy();

    const dadosCategorias = dadosGrafico(props.respostaAPI, categoriasSaida);
    setLimiteRestante(calcularLimiteRestante(dadosCategorias, limiteMensal));

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Limite Restante', ...categoriasSaida],
        datasets: [
          {
            label: 'R$',
            data: [limiteRestante, ...dadosCategorias],
            backgroundColor: [
              'rgb(150, 150, 150)',
              'rgb(66, 133, 244)',
              'rgb(219, 68, 55)',
              'rgb(244, 180, 0)',
              'rgb(15, 157, 88)',
              'rgb(171, 71, 188)',
              'rgb(255, 112, 67)',
              'rgb(0, 172, 193)'
            ],
            hoverOffset: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20,
              padding: 10
            }
          }
        },
        layout: {
          autoPadding: true
        }
      }
    });

    const progressCtx = document.getElementById('progressBar');
    if (Chart.getChart('progressBar')) Chart.getChart('progressBar').destroy();

    const progressChart = new Chart(progressCtx, {
      type: 'bar',
      data: {
        labels: ['Gastos vs Limite'],
        datasets: [
          {
            label: 'Gasto',
            data: [dadosCategorias.reduce((acc, val) => acc + val, 0)],
            backgroundColor: 'rgb(219, 68, 55)',
            barThickness: 25,
          },
          {
            label: 'Limite Restante',
            data: [limiteRestante],
            backgroundColor: 'rgb(15, 157, 88)',
            barThickness: 25,
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: ''
          },
          legend: {
            position: 'bottom',
          }
        },
        scales: {
          x: {
            ticks: {
              display: false
            },
            stacked: true,
            grid: {
              drawBorder: false,
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            ticks: {
              display: false
            },
            stacked: true,
            grid: {
              drawBorder: false,
              display: false
            },
            border: {
              display: false
            }
          }
        }
      }
    });

    const handleResize = () => {
      chart.resize();
      progressChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.destroy();
      progressChart.destroy();
    };

  }, [props.respostaAPI, limiteMensal, limiteRestante]);

  return (
    <div className={`card col-11 col-lg-7 row m-3 mx-auto ${styles.cardGrafico}`}>
      <div className={`d-flex justify-content-between ${styles.title}`}>
        <h5 className='m-0'>Limite Mensal</h5>
        <div className='d-flex'>
          <h4 className='m-0'>R$ {limiteMensal}</h4>
          <Popover setLimiteMensal={setLimiteMensal} />
        </div>
      </div>

      <div className={`card-body d-flex ${styles.card_Body}`}>
        <div className={`col-12 col-md-6 ${styles.canvaDiv}`}>
          {props.respostaAPI.length !== 0 &&
            (<canvas className={`${styles.doughnutGrafico}`} id="grafico"></canvas>)}
        </div>

        <div className={`col-12 col-md-6 ${styles.limit_container}`}>
          <div className={`${styles.limite_mensal}`}>
            <span>Limite restante: </span>
            <span>R$ {limiteRestante}</span>
          </div>
          <div>
          <canvas id="progressBar" className={`${styles.progressBar}`}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}