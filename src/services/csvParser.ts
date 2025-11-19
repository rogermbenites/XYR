// src/services/csvParser.ts
import Papa from 'papaparse';

export const parseCSV = (file: File, callback: (data: any[]) => void) => {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: (result) => {
      console.debug('Parsed CSV:', result.data);
      callback(result.data as any[]);
    },
  });
};
