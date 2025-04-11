import React from 'react';
import SystemStatus from './SystemStatus/SystemStatus';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import GroupList from './GroupList/GroupList';
import './LeftPanel.css';

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