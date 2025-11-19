// src/components/FolderSelector.tsx
import React, { useState, useRef, useEffect } from 'react';

interface FolderSelectorProps {
  onFolderSelected: (folderPath: string) => void;
}

const FolderSelector: React.FC<FolderSelectorProps> = ({ onFolderSelected }) => {
  const [folderPath, setFolderPath] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filePath = files[0].webkitRelativePath;
      const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));
      setFolderPath(directoryPath);
      onFolderSelected(directoryPath);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute('webkitdirectory', 'true');
      inputRef.current.setAttribute('directory', 'true');
    }
  }, []);

  return (
    <div className="folder-selector">
      <label htmlFor="folder" className="block text-sm font-medium text-gray-700">
        Select data directory:
      </label>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      {folderPath && (
        <div className="mt-2 text-sm text-gray-500">Selected Directory: {folderPath}</div>
      )}
    </div>
  );
};

export default FolderSelector;
