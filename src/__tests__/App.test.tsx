import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App, { Main } from '../App';

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });

  it('should display the CPU temperature', () => {
    render(<Main cpuTemperature={50} outsideTemperature={30} />);
    expect(screen.getByText('CPU temperature')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Outside temperature')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
