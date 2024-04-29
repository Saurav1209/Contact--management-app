// LineGraph.tsx
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useQuery } from 'react-query';

const LineGraph: React.FC = () => {// Fetching historical COVID-19 data
  const { data } = useQuery('historicalData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.json();
  });

  useEffect(() => {
  
    
    if (data && data.cases) {// Checking if data and cases exist
      // console.log('case',data);
      renderChart(data.cases, data.deaths, data.recovered); //rendering chart
    }
  }, [data]);
//  cases{
//   "key":val ;
//  }
  const renderChart = (cases: { [key: string]: number }, deaths: { [key: string]: number }, recovered: { [key: string]: number }) => {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    let chartInstance: Chart | undefined;// Declaring Chart instance variable
  
    if (canvas) {
      chartInstance = Chart.getChart(canvas);
    }
  
    if (chartInstance) {
      // checking if chart instance is already ther then updaing its values
      chartInstance.data.labels = Object.keys(cases);
      chartInstance.data.datasets[0].data = Object.values(cases);
      chartInstance.data.datasets[1].data = Object.values(deaths);
      chartInstance.data.datasets[2].data = Object.values(recovered);
      chartInstance.update();
    } else {
      //cresting new chart instance
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(cases),//x-axis labels
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
