import React from 'react';
import MetricsChart from './MetricsChart/MetricsChart';
import InterfaceInfo from './InterfaceInfo/InterfaceInfo';
import AdminInfo from './AdminInfo/AdminInfo';
import AppsList from './AppsList/AppsList';
//import './RightPanel.css';

const RightPanel = () => {
  return (
    <div className="panel right-panel">
      <MetricsChart />
      <InterfaceInfo />
      <AdminInfo />
      <AppsList />
    </div>
  );
};

export default RightPanel;