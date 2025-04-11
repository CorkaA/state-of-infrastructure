import React from 'react';
import { useSelector } from 'react-redux';
import { useGetGroupsQuery } from '../../../api/infrastructureAPI';
import { getStatusColor } from '../../../features/utils/dataTransformers';
import './styles.css'

const GeneralInfo = () => {
  const { data: groups = [] } = useGetGroupsQuery();
  const selectedGroupId = useSelector(state => state.infrastructure.selectedGroupId);

  // Расчет статистики
  let totalNodes = 0;
  let activeNodes = 0;
  let alerts = 0;

  groups.forEach(group => {
    // Если выбрана конкретная группа, пропускаем другие
    if (selectedGroupId && group.id !== selectedGroupId) return;
    
    // Проверяем, что nodes существует и является массивом
    const groupNodes = Array.isArray(group.nodes) ? group.nodes : [];
    
    totalNodes += groupNodes.length;
    
    groupNodes.forEach(node => {
      const status = node.status?.description || '';
      if (status === 'UP') {
        activeNodes++;
      } else if (status) {
        alerts++;
      }
    });
  });

  return (
    <div className="info-section">
      <h2>General Information</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span>Total Nodes: </span>
          <span>{totalNodes}</span>
        </div>
        <div className="stat-item">
          <span>Active Nodes: </span>
          <span>{activeNodes}</span>
        </div>
        <div className="stat-item">
          <span>Alerts: </span>
          <span>{alerts}</span>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;