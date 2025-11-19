// src/components/SystemRunSelector.tsx
import React, { useEffect, useState } from 'react';
import { listFiles } from '../services/apiService';
import { pathJoin } from '../utils/pathJoin';

interface SystemRunSelectorProps {
  selectedDirectory: string;
  selectedSubDirectory: string;
  selectedSystem: string;
  setSelectedSystem: (s: string) => void;
  selectedTicker: string;
  setSelectedTicker: (t: string) => void;
  selectedRun: string;
  setSelectedRun: (r: string) => void;
}

const SystemRunSelector: React.FC<SystemRunSelectorProps> = ({
  selectedDirectory,
  selectedSubDirectory = 'systems_runs',
  selectedSystem,
  setSelectedSystem,
  selectedTicker,
  setSelectedTicker,
  selectedRun,
  setSelectedRun,
}) => {
  const [systems, setSystems] = useState<string[]>([]);
  const [tickers, setTickers] = useState<string[]>([]);
  const [runs, setRuns] = useState<string[]>([]);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const systemNames = await listFiles(pathJoin(selectedDirectory, selectedSubDirectory));
        console.debug('Systems:', systemNames);
        setSystems(systemNames);
      } catch (error) {
        console.error('Error fetching systems:', error);
      }
    };

    if (selectedDirectory) {
      fetchSystems();
    }
  }, [selectedSubDirectory, selectedDirectory]);

  useEffect(() => {
    const fetchTickers = async () => {
      if (selectedSystem) {
        try {
          const tickerNames = await listFiles(pathJoin(selectedDirectory, selectedSubDirectory, selectedSystem));
          setTickers(tickerNames);
        } catch (error) {
          console.error('Error fetching tickers:', error);
        }
      }
    };

    fetchTickers();
  }, [selectedSystem, selectedSubDirectory, selectedDirectory]);

  useEffect(() => {
    const fetchRuns = async () => {
      if (selectedTicker) {
        try {
          const runNames = await listFiles(pathJoin(selectedDirectory, selectedSubDirectory, selectedSystem, selectedTicker));
          setRuns(runNames);
        } catch (error) {
          console.error('Error fetching runs:', error);
        }
      }
    };

    fetchRuns();
  }, [selectedTicker, selectedSystem, selectedSubDirectory, selectedDirectory]);

  const handleSystemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const system = event.target.value;
    setSelectedSystem(system);
    setSelectedTicker('');
    setSelectedRun('');
  };

  const handleTickerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const ticker = event.target.value;
    setSelectedTicker(ticker);
    setSelectedRun('');
  };

  const handleRunChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const run = event.target.value;
    setSelectedRun(run);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="system"
          className="block text-sm font-medium text-gray-700"
        >
          Select System:
        </label>
        <select
          id="system"
          value={selectedSystem}
          onChange={handleSystemChange}
          className="mt-1 block w-full text-base p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select system</option>
          {systems.map((system) => (
            <option key={system} value={system}>
              {system}
            </option>
          ))}
        </select>
      </div>

      {selectedSystem && (
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="ticker"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Select Ticker:
          </label>
          <select
            id="ticker"
            value={selectedTicker}
            onChange={handleTickerChange}
            className="mt-1 block w-full text-base p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select ticker</option>
            {tickers.map((ticker) => (
              <option key={ticker} value={ticker}>
                {ticker}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTicker && (
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="run"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Select Run:
          </label>
          <select
            id="run"
            value={selectedRun}
            onChange={handleRunChange}
            className="mt-1 block w-full text-base p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select run</option>
            {runs.map((run) => (
              <option key={run} value={run}>
                {run}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SystemRunSelector;
