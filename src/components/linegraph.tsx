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
    console.log('case',data.cases);
    
    if (data && data.cases) {
      renderChart(data.cases);
    }
  }, [data]);

  const renderChart = (cases: { [key: string]: number }) => {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
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
          ],
        },
      });
    }
  };

  return <canvas id="line-chart" width="400" height="200"></canvas>;
};

export default LineGraph;
