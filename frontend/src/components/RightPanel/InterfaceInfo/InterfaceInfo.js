import React from 'react';
import { useSelector } from 'react-redux';
import { useGetGroupsQuery } from '../../../features/infrastructureAPI';
import { getStatusColor } from '../../../utils/dataTransformers';

const InterfaceInfo = () => {
  const selectedNodeId = useSelector(state => state.infrastructure.selectedNodeId);
  const { data: groups = [] } = useGetGroupsQuery();

  // Находим данные интерфейса
  let interfaceName = 'Unknown';
  let interfaceStatus = 'UNKNOWN';
  
  if (selectedNodeId) {
    for (const group of groups) {
      const groupNodes = Array.isArray(group.nodes) ? group.nodes : [];
      const node = groupNodes.find(n => n.id === selectedNodeId);
      if (node) {
        // Обрабатываем интерфейс (может быть строкой или объектом)
        if (node.interface) {
          const interfaceObj = typeof node.interface === 'string' ? 
                             JSON.parse(node.interface) : 
                             node.interface;
          
          interfaceName = interfaceObj.caption || interfaceObj.name || 'Unknown';
          interfaceStatus = interfaceObj.status || 'UNKNOWN';
        }
        
        // Получаем описание статуса
        const statusDescription = node.statusDescription || 
                                (node.status ? node.status.description : 'UNKNOWN');
        
        return (
          <div className="interface-section">
            <h2>Interface</h2>
            <div className="interface-details">
              <div className="interface-name">
                <span className="label">Name:</span>
                <span>{interfaceName}</span>
              </div>
              <div className="interface-status">
                <span className="label">Status:</span>
                <span style={{ color: getStatusColor(statusDescription) }}>
                  {statusDescription}
                </span>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div className="interface-section">
      <h2>Interface</h2>
      <div className="no-interface">
        {selectedNodeId ? 'No interface data' : 'Select a node to view interface'}
      </div>
    </div>
  );
};

export default InterfaceInfo;