import React from 'react';
import SystemStatus from '../../components/LeftPanel/SystemStatus';
import GeneralInfo from '../../components/LeftPanel/GeneralInfo';
import GroupList from '../../components/LeftPanel/GroupList';
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