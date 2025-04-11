import React from 'react';
import MetricsChart from './MetricsChart';
import InterfaceInfo from './InterfaceInfo';
import AdminInfo from './AdminInfo';
import AppsList from './AppsList';
import './styles.css';

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