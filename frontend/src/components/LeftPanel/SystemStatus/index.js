import React from 'react';
import { useSelector } from 'react-redux';
import { useGetNodesQuery } from '../../../features/infrastructureAPI';
import './styles.css'

const SystemStatus = () => {
  const selectedGroupId = useSelector(state => state.infrastructure.selectedGroupId);
  const { data: nodes = [] } = useGetNodesQuery(selectedGroupId, {
    skip: !selectedGroupId,
  });

  // Определение худшего статуса
  const getWorstStatus = () => {
    if (nodes.length === 0) return { text: 'No nodes', color: '#9e9e9e' };

    const statusPriority = {
      '#B71C1C': 5, // down
      '#F44336': 4, // critical
      '#FFC107': 3, // warning
      '#4CAF50': 2, // up
      '#808080': 1, // shutdown
      '#000000': 0, // unreachable
    };

    let worstStatus = { text: 'All nodes up', color: '#4CAF50' };
    let maxPriority = -1;

    nodes.forEach(node => {
      const priority = statusPriority[node.statusColor] || -1;
      if (priority > maxPriority) {
        maxPriority = priority;
        worstStatus = {
          text: node.statusDescription || 'Unknown status',
          color: node.statusColor || '#9e9e9e',
        };
      }
    });

    return worstStatus;
  };

  const status = getWorstStatus();

  return (
    <div className="status-section">
      <h2>System Status</h2>
      <div className="status-indicator" style={{ backgroundColor: status.color }}>
        {status.text}
      </div>
    </div>
  );
};

export default SystemStatus;
