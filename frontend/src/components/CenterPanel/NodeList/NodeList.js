import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNode } from '../../../features/infrastructureSlice';
import { useGetNodesQuery } from '../../../api/infrastructureAPI';
import './styles.css';

const NodeList = () => {
  const dispatch = useDispatch();
  const selectedGroupId = useSelector(state => state.infrastructure.selectedGroupId);
  const selectedNodeId = useSelector(state => state.infrastructure.selectedNodeId);
  const { data: nodes = [], isLoading } = useGetNodesQuery(selectedGroupId, {
    skip: !selectedGroupId,
  });

  const getStatusColor = (usage) => {
    if (usage > 95) return '#ff5252';
    if (usage > 85) return '#ffc107';
    return '#4caf50';
  };

  if (isLoading) return <div className="no-nodes">Loading nodes...</div>;
  if (!selectedGroupId) return <div className="no-nodes">Please select a group</div>;

  return (
    <div className="nodes-container">
      <h2>Nodes</h2>
      {nodes.length === 0 ? (
        <div className="no-nodes">No nodes found in this group</div>
      ) : (
        <div className="nodes-grid">
          {nodes.map(node => (
            <React.Fragment key={node.id}>
              {/* Колонка 1: Индикатор статуса */}
              <div 
                className={`node-row ${selectedNodeId === node.id ? 'selected' : ''}`}
                onClick={() => dispatch(selectNode(node.id))}
              >
                <div 
                  className="node-status-indicator"
                  style={{ 
                    backgroundColor: node.statusColor || '#9e9e9e'
                  }} 
                />
              </div>
              
              {/* Колонка 2: Название ноды */}
              <div 
                className={`node-name ${selectedNodeId === node.id ? 'selected' : ''}`}
                onClick={() => dispatch(selectNode(node.id))}
              >
                {node.name}
              </div>
              
              {/* Колонка 3: Метрики */}
              <div 
                className={`node-metrics ${selectedNodeId === node.id ? 'selected' : ''}`}
                onClick={() => dispatch(selectNode(node.id))}
              >
                <div className="metric-row">
                  <span className="metric-label">CPU:</span>
                  <span 
                    className="metric-value"
                    style={{ color: getStatusColor(node.cpu) }}
                  >
                    {node.cpu}%
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Memory:</span>
                  <span 
                    className="metric-value"
                    style={{ color: getStatusColor(node.memory) }}
                  >
                    {node.memory}%
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Disk:</span>
                  <span 
                    className="metric-value"
                    style={{ color: getStatusColor(node.disk) }}
                  >
                    {node.disk}%
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default NodeList;