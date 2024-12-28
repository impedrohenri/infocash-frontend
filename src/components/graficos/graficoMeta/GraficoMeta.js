import styles from './GraficoMeta.module.css';
import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';

export default function GraficoMeta(props) {
  useEffect(() => {
    const ctx = document.getElementById('grafico');

    if (Chart.getChart('grafico')) Chart.getChart('grafico').destroy();

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Alimentação',
          'Lazer',
          'Educação',
          'Restante',
  
        //   'Habitação',
        //   'Vestuário',
        //   'PET'
        ],
        datasets: [
          {
            label: 'R$',
            data: [50, 50, 10, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(200, 200, 200)'

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

  }, []);

  return (
    <div className={`col-11 col-md-5  row m-3 mx-auto ${styles.cardGrafico}`}>
      <div className={`card ${styles.cardBoard}`}>
        <div className={`card-body `}>
          <h5 className="card-title">Limite Mensal</h5>
          <div className={`${styles.canvaDiv}`}>
            <canvas className={`${styles.doughnutGrafico}`} id="grafico"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
