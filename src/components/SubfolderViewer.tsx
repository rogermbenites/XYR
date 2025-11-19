// src/components/SubfolderViewer.tsx
import React, { useState, useEffect } from 'react';
import { listFiles } from '../services/apiService';

interface SubfolderViewerProps {
  topFolder: string;
  onSubfolderSelected: (subfolder: string) => void;
}

const SubfolderViewer: React.FC<SubfolderViewerProps> = ({ topFolder, onSubfolderSelected }) => {
  const [subfolders, setSubfolders] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubfolders = async () => {
      if (topFolder) {
        try {
          const data = await listFiles(topFolder);
          const subfolderNames = data.filter(item => !item.includes('.'));
          setSubfolders(subfolderNames);
        } catch (error) {
          console.error('Error fetching subfolders:', error);
        }
      }
    };

    fetchSubfolders();
  }, [topFolder]);

  return (
    <div className="subfolder-viewer my-4">
      <label htmlFor="subfolder" className="block text-sm font-medium text-gray-700">
        Select Subfolder:
      </label>
      <select
        id="subfolder"
        onChange={(e) => onSubfolderSelected(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Select a subfolder</option>
        {subfolders.map((subfolder) => (
          <option key={subfolder} value={subfolder}>
            {subfolder}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubfolderViewer;
