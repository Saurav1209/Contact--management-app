// LineGraph.tsx
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useQuery } from 'react-query';

const LineGraph: React.FC = () => {
  const { data } = useQuery('historicalData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.json();
  });

  useEffect(() => {
  
    
    if (data && data.cases) {
      console.log('case',data);
      renderChart(data.cases, data.deaths, data.recovered);
    }
  }, [data]);

  const renderChart = (cases: { [key: string]: number }, deaths: { [key: string]: number }, recovered: { [key: string]: number }) => {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    let chartInstance: Chart | undefined;
  
    if (canvas) {
      chartInstance = Chart.getChart(canvas);
    }
  
    if (chartInstance) {
      chartInstance.data.labels = Object.keys(cases);
      chartInstance.data.datasets[0].data = Object.values(cases);
      chartInstance.update();
    } else {
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(cases),
            datasets: [
              {
                label: 'Cases',
                data: Object.values(cases),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
              {
                label: 'Deaths',
                data: Object.values(deaths),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
              },
              {
                label: 'Recovered',
                data: Object.values(recovered),
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1,
              },
            ],
          },
        });
      }
    }
  };
  
  return <canvas id="line-chart" width="400" height="200"></canvas>;
};

export default LineGraph;
