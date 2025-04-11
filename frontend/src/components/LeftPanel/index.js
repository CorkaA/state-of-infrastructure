import React from 'react';
import SystemStatus from './SystemStatus';
import GeneralInfo from './GeneralInfo';
import GroupList from './GroupList';
import './styles.css';

const LeftPanel = () => {
  return (
    <div className="panel left-panel">
      <SystemStatus />
      <GeneralInfo />
      <GroupList />
    </div>
  );
};

export default LeftPanel;