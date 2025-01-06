import styles from './GraficoMeta.module.css';
import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';


export default function GraficoMeta(props) {    


  useEffect(() => {
    const categoriasSaida = [
      ...new Set(
        props.respostaAPI
          .filter(operacao => operacao.tipoOperacao === "saida")
          .map(operacao => String(operacao.categoria))
      )
    ];

      const dadosGrafico = (resJSON, categorias) => {
        let data = [];
      
        for(let cat of categorias){
          let lista = []
          resJSON.forEach(operacao => (operacao.categoria === cat) && (operacao.tipoOperacao === "saida") && lista.push(parseInt(operacao.valor)));
          data.push(lista.reduce((valorAnterior, valor) => (valorAnterior + valor), 0))    
        };
        
        return data;
      }
    const ctx = document.getElementById('grafico');
    if (Chart.getChart('grafico')) Chart.getChart('grafico').destroy();

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categoriasSaida,
        datasets: [
          {
            label: 'R$',
            data: dadosGrafico(props.respostaAPI, categoriasSaida),
            backgroundColor: [
              'rgb(66, 133, 244)',
              'rgb(219, 68, 55)',
              'rgb(244, 180, 0)',
              'rgb(15, 157, 88)',
              'rgb(171, 71, 188)',
              'rgb(255, 112, 67)',
              'rgb(0, 172, 193)',
              
              'rgb(240, 240, 240)'

            ],
            hoverOffset: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,
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

  }, [props.respostaAPI]);

  return (
    <div className={`col-11 col-md-5  row m-3 mx-auto ${styles.cardGrafico}`}>
      <div className={`card ${styles.cardBoard}`}>
        <div className={`card-body `}>
          <h5 className="card-title">Limite Mensal</h5>
          <div className={`${styles.canvaDiv}`}>
            
            {props.respostaAPI.length !== 0 &&
            (<canvas className={`${styles.doughnutGrafico}`} id="grafico"></canvas>)}
          </div>
        </div>
      </div>
    </div>
    
    
  );

  
}
