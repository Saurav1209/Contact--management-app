import React, { useState } from 'react';
import LineGraph from './linegraph';
import Map from './map';

const Dashboard: React.FC = () => {
  const [showLineGraph, setShowLineGraph] = useState(true);

  return (
    <div className='px-2'>
      <h1 className="text-2xl font-bold mb-4 text-center my-3">COVID-19 Dashboard</h1>
      <div className="flex justify-start mb-4">
        <button
          className="mr-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          onClick={() => setShowLineGraph(true)}
        >
          Show Line Graph
        </button>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
          onClick={() => setShowLineGraph(false)}
        >
          Show Map
        </button>
      </div>
      {showLineGraph ? <LineGraph /> : <Map />}
    </div>
  );
};

export default Dashboard;
