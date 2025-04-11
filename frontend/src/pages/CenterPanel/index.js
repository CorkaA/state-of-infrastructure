import React from 'react';
import NodeList from '../../components/CenterPanel/NodeList/NodeList';
import './styles.css';

const CenterPanel = () => {
  return (
    <div className="panel center-panel">
      <NodeList />
    </div>
  );
};

export default CenterPanel;