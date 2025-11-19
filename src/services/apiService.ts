// src/services/apiService.ts
import axios from "axios";
import {
  parseTickData,
  parseIndicatorR,
  parseIndicatorXY,
  parseStrategyXYR,
} from "./dataAdapters";
import { sortBy } from "lodash";

const apiRoot = "http://127.0.0.1:5000";

export const listFiles = async (path: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${apiRoot}/list`, { params: { path } });
    return sortBy(response.data.files);
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};

export const getFileData = async (filePath: string): Promise<any> => {
  try {
    const response = await axios.get(`${apiRoot}/file`, {
      params: { path: filePath },
    });
    const data = response.data;

    console.debug("[getFileData] filePath:", filePath);
    console.debug("[getFileData] Fetched data:", data);

    // Determine the type of file and parse accordingly
    let parsedData;
    if (filePath.includes("/512T.csv") || filePath.includes("/50000T.csv")) {
      parsedData = parseTickData(data);
    } else if (filePath.includes("/r.csv")) {
      parsedData = parseIndicatorR(data);
    } else if (filePath.includes("/xy.csv")) {
      parsedData = parseIndicatorXY(data);
    } else if (filePath.includes("/xyr.csv")) {
      parsedData = parseStrategyXYR(data);
    } else {
      throw new Error("Unknown file type");
    }
    console.debug("[getFileData] parsedData:", parsedData);
    
    return parsedData;
  } catch (error) {
    console.error("Error getting file data:", error);
    throw error;
  }
};
