import si from 'systeminformation';
import React from 'react';
import '@testing-library/jest-dom';
import { enableFetchMocks } from 'jest-fetch-mock';
import { render, screen } from '@testing-library/react';
import App from '../App';
import ErrorBoundary from '../ErrorBoundary';

jest.mock('systeminformation');

describe('App', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation();
    enableFetchMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Should start with zero values', () => {
    beforeEach(() => {
      (si.cpuTemperature as jest.Mock).mockReturnValue({ cores: [50] });
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: () => Promise.resolve({ main: { temp: 20 } }),
      });

      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
    });

    it('should display the cpu and outside temperature as zero initially', async () => {
      expect(screen.getByText('CPU temperature: 0')).toBeInTheDocument();
      expect(screen.getByText('Outside temperature: 0')).toBeInTheDocument();
    });

    it('should update the values after 5 seconds', async () => {
      expect(
        await screen.findByText(/cpu temperature: 50/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/outside temperature: 20/i)
      ).toBeInTheDocument();
    });
  });

  describe('CPU temperature error Handling', () => {
    beforeAll(() => {
      jest.spyOn(window, 'fetch').mockResolvedValue({
        json: () => Promise.resolve({ main: { temp: 20 } }),
      });
    });

    it('should display an error if it fails to read the cpu temperature', async () => {
      (si.cpuTemperature as jest.Mock).mockRejectedValue('Your CPU is too hot');

      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );

      expect(
        await screen.findByText(/your cpu is too hot/i)
      ).toBeInTheDocument();
    });
  });

  describe('Weather temperature error Handling', () => {
    beforeAll(() => {
      (si.cpuTemperature as jest.Mock).mockReturnValue({ cores: [50] });
    });

    it('should display an error if it fails to read the weather temperature', async () => {
      jest.spyOn(window, 'fetch').mockRejectedValue('Your api key is invalid');

      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );

      expect(
        await screen.findByText(/your api key is invalid/i)
      ).toBeInTheDocument();
    });
  });
});
