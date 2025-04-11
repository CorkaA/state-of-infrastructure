export const getStatusColor = (statusDescription) => {
    if (!statusDescription) return '#9e9e9e';
    
    const statusMap = {
      'UP': '#4CAF50',
      'WARNING': '#FFC107',
      'CRITICAL': '#F44336',
      'DOWN': '#B71C1C',
      'SHUTDOWN': '#808080',
      'UNREACHABLE': '#000000',
      default: '#9e9e9e'
    };
  
    return statusMap[statusDescription] || statusMap.default;
  };
  
  export const transformGroupsData = (groups) => {
    if (!groups) return [];
    
    return groups.map(group => ({
      ...group,
      name: group.group_name || group.caption || 'Unnamed Group',
      nodeCount: group.nodes?.length || 0,
      statusColor: getStatusColor(group.nodes?.[0]?.status?.description),
    }));
  };
  
  export const transformNodesData = (nodes) => {
    if (!nodes) return [];
    
    return nodes.map(node => {
      // Получаем метрики из JSON строки или объекта
      let metrics = {};
      try {
        metrics = typeof node.metrics === 'string' ? 
                  JSON.parse(node.metrics) : 
                  node.metrics || {};
      } catch (e) {
        console.error('Error parsing metrics:', e);
      }
      
      // Получаем статус интерфейса
      let interfaceStatus = '';
      try {
        const interfaceObj = typeof node.interface === 'string' ? 
                            JSON.parse(node.interface) : 
                            node.interface || {};
        interfaceStatus = interfaceObj.status || '';
      } catch (e) {
        console.error('Error parsing interface:', e);
      }
      
      return {
        ...node,
        id: node.id,
        name: node.caption || 'Unnamed Node',
        statusColor: getStatusColor(node.statusDescription),
        statusDescription: node.statusDescription,
        cpu: metrics.cpu_utilization || 0,
        memory: metrics.memory_utilization || 0,
        disk: metrics.disk_utilization || 0,
        interface: node.interface,
        admin: node.admin
      };
    });
  };