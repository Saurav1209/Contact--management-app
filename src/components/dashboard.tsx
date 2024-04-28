// Dashboard.tsx
import React from 'react';
import LineGraph from './linegraph';
import Map from './map';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">COVID-19 Dashboard</h1>
      <LineGraph />
      <Map />
    </div>
  );
};

export default Dashboard;
