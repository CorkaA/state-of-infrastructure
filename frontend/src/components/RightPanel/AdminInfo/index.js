import React from 'react';
import { useSelector } from 'react-redux';
import { useGetGroupsQuery } from '../../../api/infrastructureAPI';
import './styles.css';

const AdminInfo = () => {
  const selectedNodeId = useSelector(state => state.infrastructure.selectedNodeId);
  const { data: groups = [] } = useGetGroupsQuery();

  // Поиск администратора для выбранной ноды
  let adminData = null;
  if (selectedNodeId) {
    for (const group of groups) {
      const groupNodes = Array.isArray(group.nodes) ? group.nodes : [];
      const node = groupNodes.find(n => n.id === selectedNodeId);
      if (node && node.admin) {
        adminData = {
          name: node.admin.name || `${node.admin.firstname} ${node.admin.lastname}`,
          email: node.admin.email || 'No email'
        };
        break;
      }
    }
  }

  return (
    <div className="admin-section">
      <h2>Administrator</h2>
      {adminData ? (
        <div className="admin-details">
          <div className="admin-name">
            <span className="label">Name: </span>
            <span>{adminData.name}</span>
          </div>
          <div className="admin-email">
            <span className="label">Email: </span>
            <span>{adminData.email}</span>
          </div>
        </div>
      ) : (
        <div className="no-admin">
          {selectedNodeId ? 'No administrator data' : 'Select a node to view administrator'}
        </div>
      )}
    </div>
  );
};

export default AdminInfo;