import systemInformation from 'systeminformation';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

async function getCpuTemperature() {
  const cpuTemperatureDetails = await systemInformation
    .cpuTemperature()
    .catch(console.error);
  if (!cpuTemperatureDetails) return 0;
  return cpuTemperatureDetails.cores[0];
}

const Content = () => {
  const [cpuTemperature, setCpuTemperature] = useState(0);

  useEffect(() => {
    setInterval(async () => {
      setCpuTemperature(await getCpuTemperature());
    }, 1000);
  }, []);

  return <div>{cpuTemperature}</div>;
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Content} />
      </Switch>
    </Router>
  );
}
