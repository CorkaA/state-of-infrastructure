import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGroup } from '../../../features/infrastructureSlice';
import { useGetGroupsQuery } from '../../../features/infrastructureAPI';
import './styles.css'

const GroupList = () => {
  const dispatch = useDispatch();
  const { data: groups = [], isLoading } = useGetGroupsQuery();
  const selectedGroupId = useSelector(state => state.infrastructure.selectedGroupId);

  if (isLoading) return <div>Loading groups...</div>;

  return (
    <div className="groups-section">
      <h2>Groups</h2>
      <ul className="groups-list">
        {groups.map(group => (
          <li 
            key={group.id}
            className={`group-item ${selectedGroupId === group.id ? 'selected' : ''}`}
            onClick={() => dispatch(selectGroup(group.id))}            
          >
            {group.name} ({group.nodeCount})            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;

