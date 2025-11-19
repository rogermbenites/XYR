// src/components/DirectorySelector.tsx
import React from 'react';
import Cookies from 'js-cookie';

interface DirectorySelectorProps {
  selectedDirectory: string;
  setSelectedDirectory: (directoryPath: string) => void;
}

const DirectorySelector: React.FC<DirectorySelectorProps> = ({
  selectedDirectory = '',
  setSelectedDirectory,
}) => {
  // const [selectedPath, setSelectedPath] = useState<string>('');

  const handleDirectoryChange = async () => {
    try {
      // @ts-ignore
      if ('showDirectoryPicker' in window) {
        // @ts-ignore
        const directoryHandle = await window.showDirectoryPicker();
        const path = await getFullPath(directoryHandle);
        setSelectedDirectory(path);
        Cookies.set('selectedDirectory', path, { expires: 7 }); // Save in cookie for 7 days
      } else {
        console.error('Directory Picker API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  };

  const getFullPath = async (handle: any) => {
    const parts = [handle.name];
    let currentHandle = handle;
    while (currentHandle.parent) {
      currentHandle = await currentHandle.parent;
      parts.unshift(currentHandle.name);
    }
    return parts.join('/');
  };

  return (
    <div>
      <button
        onClick={handleDirectoryChange}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Select Data Directory
      </button>
      {selectedDirectory && (
        <div className="mt-4">
          <strong>Selected Directory: </strong>{selectedDirectory}
        </div>
      )}
    </div>
  );
};

export default DirectorySelector;
