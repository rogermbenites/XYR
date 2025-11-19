// src/components/DataViewer.tsx
import React from 'react';
import TickDataViewer from './dataViewers/TickDataViewer';
import IndicatorRViewer from './dataViewers/IndicatorRViewer';
import IndicatorXYViewer from './dataViewers/IndicatorXYViewer';
import StrategyXYRViewer from './dataViewers/StrategyXYRViewer';

interface DataViewerProps {
  data: any[];
  fileName: string;
}

const DataViewer: React.FC<DataViewerProps> = ({ data, fileName }) => {
  if (data.length === 0) {
    return <div>No data to display</div>;
  }

  let ViewerComponent;

  if (fileName.includes('512T') || fileName.includes('50000T')) {
    ViewerComponent = TickDataViewer;
  } else if (fileName.includes('r') && !fileName.includes('xy')) {
    ViewerComponent = IndicatorRViewer;
  } else if (fileName.includes('xy') && !fileName.includes('r')) {
    ViewerComponent = IndicatorXYViewer;
  } else if (fileName.includes('xyr')) {
    ViewerComponent = StrategyXYRViewer;
  } else {
    return <div>Unsupported data format</div>;
  }

  return <ViewerComponent data={data} />;
};

export default DataViewer;
