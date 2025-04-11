SELECT 
  m.id,
  m.datetime,
  m.cpu_utilization,
  m.memory_utilization,
  m.disk_utilization,
  m.node_id,
  n.caption AS node_name,
  s.color AS status_color,
  s.description AS status_description
FROM metrics m
JOIN nodes n ON m.node_id = n.id
LEFT JOIN statuses s ON n.status = s.Id
ORDER BY m.datetime DESC
