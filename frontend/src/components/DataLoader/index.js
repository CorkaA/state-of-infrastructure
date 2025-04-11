import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetGroupsQuery,
  useGetNodesQuery,
  useGetMetricsQuery,
} from '../../features/infrastructureAPI';
import { setLoading } from '../../features/infrastructureSlice';

const DataLoader = ({ children }) => {
  const dispatch = useDispatch();
  const { selectedGroupId, selectedNodeId } = useSelector(state => state.infrastructure);
  
  // Запросы данных
  const { 
    data: groupsData, 
    isLoading: groupsLoading, 
    refetch: refetchGroups 
  } = useGetGroupsQuery();
  
  const { 
    data: nodesData, 
    isLoading: nodesLoading, 
    refetch: refetchNodes 
  } = useGetNodesQuery(selectedGroupId, {
    skip: !selectedGroupId,
  });
  
  const { 
    data: metricsData, 
    isLoading: metricsLoading, 
    refetch: refetchMetrics 
  } = useGetMetricsQuery();

  // Обновление состояния загрузки
  useEffect(() => {
    const isLoading = groupsLoading || nodesLoading || metricsLoading;
    dispatch(setLoading(isLoading));
  }, [groupsLoading, nodesLoading, metricsLoading, dispatch]);

  // Автоматическое обновление данных каждую минуту
  useEffect(() => {
    const interval = setInterval(() => {
      if (groupsData) refetchGroups();
      if (nodesData) refetchNodes();
      if (metricsData) refetchMetrics();
    }, 60000);

    return () => clearInterval(interval);
  }, [groupsData, nodesData, metricsData]);

  return children;
};

export default DataLoader;