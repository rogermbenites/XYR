// src/App.tsx
import React, { useState, useEffect } from "react";
import DirectorySelector from "./components/DirectorySelector";
import SystemRunSelector from "./components/SystemRunSelector";
import DataUploader from "./components/DataUploader";
import DataViewer from "./components/DataViewer";
import SystemRunDataFileSelector from "./components/SystemRunDataFileSelector";
import { pathJoin } from "./utils/pathJoin";
import { getFileData } from "./services/apiService";
import "./index.css";
import Cookies from "js-cookie";

const App: React.FC = () => {
  const [selectedDirectory, setSelectedDirectory] = useState<string>(
    Cookies.get("selectedDirectory") ?? ""
  );
  const [selectedSubDirectory, setSelectedSubDirectory] =
    useState<string>("systems_runs");
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [selectedTicker, setSelectedTicker] = useState<string>("");
  const [selectedRun, setSelectedRun] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [parsedData, setParsedData] = useState<any>(null);

  const selectedPath = pathJoin(
    selectedDirectory,
    selectedSubDirectory,
    selectedSystem,
    selectedTicker,
    selectedRun,
    selectedFile
  );

  console.debug("Selected Path:", selectedPath);

  useEffect(() => {
    const fetchFileData = async () => {
      if (selectedFile) {
        console.log("Selected file path:", selectedPath);

        try {
          const data = await getFileData(selectedPath);
          console.debug("[fetchFileData] Fetched data:", data);
          setParsedData(data);
        } catch (error) {
          console.error("Error fetching file data:", error);
        }
      }
    };

    fetchFileData();
  }, [selectedFile, selectedPath]);

  return (
    <div className="app container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Trading Data Viewer</h1>
      <hr className="h-1 text-black border-black my-4" />
      <div className="flex flex-row space-x-24">
        <div className="flex flex-col space-y-4">
          <DirectorySelector
            selectedDirectory={selectedDirectory}
            setSelectedDirectory={setSelectedDirectory}
          />
          {selectedDirectory && (
            <>
              <div className="mt-4">
                <strong>Selected Path: </strong>
                {selectedPath}
              </div>
              <SystemRunSelector
                selectedDirectory={selectedDirectory}
                selectedSubDirectory={selectedSubDirectory}
                selectedSystem={selectedSystem}
                setSelectedSystem={setSelectedSystem}
                selectedTicker={selectedTicker}
                setSelectedTicker={setSelectedTicker}
                selectedRun={selectedRun}
                setSelectedRun={setSelectedRun}
              />
              {selectedRun && (
                <SystemRunDataFileSelector
                  selectedDirectory={selectedDirectory}
                  selectedSubDirectory={selectedSubDirectory}
                  selectedSystem={selectedSystem}
                  selectedTicker={selectedTicker}
                  selectedRun={selectedRun}
                  onFileSelected={setSelectedFile}
                />
              )}
            </>
          )}
        </div>
        <div className="flex flex-col space-x-4 justify-center">OR</div>
        <div className="flex flex-col space-x-4">
          <DataUploader onFileParsed={setParsedData} />
        </div>
      </div>
      <hr className="h-1 text-black border-black my-4" />
      {parsedData ? <DataViewer data={parsedData} fileName={selectedFile} /> : 'No data to display'}
    </div>
  );
};

export default App;
