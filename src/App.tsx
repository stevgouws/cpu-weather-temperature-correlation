import systemInformation from 'systeminformation';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import './App.global.css';
import { clearInterval } from 'timers';

async function getCpuTemperature() {
  const cpuTemperatureDetails = await systemInformation.cpuTemperature();
  return cpuTemperatureDetails.cores[0];
}

async function getOutsideTemperature() {
  const response: any = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?lat=51.504560&lon=-0.212970&units=metric&appid=9e1968833a7cced162c050f17816cbdc'
  );
  const json = await response.json();
  const temperature = json?.main?.temp;
  if (!temperature) {
    throw new Error(
      'Weather response did not include temperature, please try again later'
    );
  }
  return temperature;
}

export function Main({ cpuTemperature, outsideTemperature }: any) {
  return (
    <main>
      <section>CPU temperature: {cpuTemperature}</section>
      <section>Outside temperature: {outsideTemperature}</section>
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
  const [error, setError] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCpuTemperature().then(setCpuTemperature).catch(setError);
      getOutsideTemperature().then(setOutsideTemperature).catch(setError);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // throw new Error('No Data');
  if (error) throw error;

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
