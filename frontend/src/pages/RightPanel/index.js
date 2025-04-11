import React from 'react';
import MetricsChart from '../../components/RightPanel/MetricsChart';
import InterfaceInfo from '../../components/RightPanel/InterfaceInfo';
import AdminInfo from '../../components/RightPanel/AdminInfo';
import AppsList from '../../components/RightPanel/AppsList';
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