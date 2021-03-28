import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

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

const Content = ({ getCpuTemperature, getOutsideTemperature }) => {
  const [cpuTemperature, setCpuTemperature] = useState(0);
  const [outsideTemperature, setOutsideTemperature] = useState(0);
  const [error, setError] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCpuTemperature().then(setCpuTemperature).catch(setError);
      getOutsideTemperature().then(setOutsideTemperature).catch(setError);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [getCpuTemperature, getOutsideTemperature]);

  if (error) throw error;

  return (
    <Main
      cpuTemperature={cpuTemperature}
      outsideTemperature={outsideTemperature}
    />
  );
};

Content.propTypes = {
  getCpuTemperature: propTypes.func.isRequired,
  getOutsideTemperature: propTypes.func.isRequired,
};

export default Content;
