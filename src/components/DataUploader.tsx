// src/components/DataUploader.tsx
import React, { ChangeEvent } from 'react';
import { parseCSV } from '../services/csvParser';

interface DataUploaderProps {
  onFileParsed: (data: any[]) => void;
}

const DataUploader: React.FC<DataUploaderProps> = ({ onFileParsed }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parseCSV(file, onFileParsed);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Upload Run Data CSV</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
};

export default DataUploader;
