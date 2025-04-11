SELECT 
  n.id,
  n.caption,
  s.color as statusColor,
  s.description as statusDescription,
  json_object(
    'id', u.id,
    'firstname', u.firstname,
    'lastname', u.lastname,
    'email', u.email
  ) as admin,
  json_object(
    'id', i.id,
    'name', i.caption,
    'status', s2.description,
    'caption', i.caption
  ) as interface,
  (
    SELECT json_object(
      'cpu_utilization', m.cpu_utilization,
      'memory_utilization', m.memory_utilization,
      'disk_utilization', m.disk_utilization
    )
    FROM metrics m
    WHERE m.node_id = n.id
    ORDER BY m.datetime DESC
    LIMIT 1
  ) as metrics
FROM nodes n
JOIN groups_nodes gn ON n.id = gn.node_id
LEFT JOIN statuses s ON n.status = s.Id
LEFT JOIN users u ON n.admin = u.id
LEFT JOIN interfaces i ON n.interface = i.id
LEFT JOIN statuses s2 ON i.status = s2.Id
WHERE gn.group_id = ?