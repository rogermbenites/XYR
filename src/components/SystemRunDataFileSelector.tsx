// src/components/SystemRunDataFileSelector.tsx
import React, { useEffect, useState } from 'react';
import { listFiles } from '../services/apiService';
import { pathJoin } from '../utils/pathJoin';

interface SystemRunDataFileSelectorProps {
  selectedDirectory: string;
  selectedSubDirectory: string;
  selectedSystem: string;
  selectedTicker: string;
  selectedRun: string;
  onFileSelected: (file: string) => void;
}

const SystemRunDataFileSelector: React.FC<SystemRunDataFileSelectorProps> = ({
  selectedDirectory,
  selectedSubDirectory,
  selectedSystem,
  selectedTicker,
  selectedRun,
  onFileSelected,
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');

  useEffect(() => {
    const fetchFiles = async () => {
      if (selectedRun) {
        try {
          const fullPath = pathJoin(
            selectedDirectory,
            selectedSubDirectory,
            selectedSystem,
            selectedTicker,
            selectedRun
          );
          const fileList = await listFiles(fullPath);
          setFiles(fileList);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      }
    };

    fetchFiles();
  }, [selectedRun, selectedDirectory, selectedSubDirectory, selectedSystem, selectedTicker]);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const file = event.target.value;
    console.debug('Selected file:', file);
    setSelectedFile(file);
    onFileSelected(file);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="file" className="block text-sm font-medium text-gray-700 mt-4">
        Select Data File:
      </label>
      <select
        id="file"
        value={selectedFile}
        onChange={handleFileChange}
        className="mt-1 block w-full text-base p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Select file</option>
        {files.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SystemRunDataFileSelector;
