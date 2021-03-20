import systemInformation from 'systeminformation';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import './App.global.css';

async function getCpuTemperature() {
  const cpuTemperatureDetails = await systemInformation
    .cpuTemperature()
    .catch(console.error);
  if (!cpuTemperatureDetails) return 0;
  return cpuTemperatureDetails.cores[0];
}

async function getOutsideTemperature() {
  const response: any = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?lat=51.504560&lon=-0.212970&units=metric&appid=9e1968833a7cced162c050f17816cbdc'
  );
  if (!response.ok) throw response;
  const json = await response.json();
  return json.main.temp;
}

export function Main({ cpuTemperature, outsideTemperature }: any) {
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>CPU temperature</th>
            <th>Outside temperature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cpuTemperature}</td>
            <td>{outsideTemperature}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

Main.propTypes = {
  cpuTemperature: propTypes.number.isRequired,
  outsideTemperature: propTypes.number.isRequired,
};

const Content = () => {
  const [cpuTemperature, setCpuTemperature] = useState(0);
  const [outsideTemperature, setOutsideTemperature] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCpuTemperature().then(setCpuTemperature).catch(console.error);
      getOutsideTemperature().then(setOutsideTemperature).catch(console.error);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Main
      cpuTemperature={cpuTemperature}
      outsideTemperature={outsideTemperature}
    />
  );
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
