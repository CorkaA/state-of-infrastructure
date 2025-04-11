import React from 'react';
import { useSelector } from 'react-redux';
import { useGetGroupsQuery } from '../../../api/infrastructureAPI';
import './styles.css';

const AppsList = () => {
  const selectedNodeId = useSelector(state => state.infrastructure.selectedNodeId);
  const { data: groups = [] } = useGetGroupsQuery();

  // Находим ноду и её приложения
  let apps = [];
  if (selectedNodeId) {
    for (const group of groups) {
      const groupNodes = Array.isArray(group.nodes) ? group.nodes : [];
      const node = groupNodes.find(n => n.id === selectedNodeId);
      if (node && node.applications) {
        apps = Array.isArray(node.applications) ? node.applications : [];
        break;
      }
    }
  }

  return (
    <div className="apps-section">
      <h2>Applications</h2>
      {apps.length > 0 ? (
        <ul className="apps-list">
          {apps.map(app => (
            <li key={app.id} className="app-item">
              <div className="app-name">{app.name}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-apps">
          {selectedNodeId ? 'No applications' : 'Select a node to view applications'}
        </div>
      )}
    </div>
  );
};

export default AppsList;