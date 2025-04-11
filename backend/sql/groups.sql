SELECT 
  g.id,
  g.caption AS group_name,
  (
    SELECT json_group_array(json_object(
      'id', n.id,
      'name', n.caption,
      'status', json_object(
        'id', s.Id,
        'color', s.color,
        'description', s.description
      ),
      'interface', json_object(
        'id', i.id,
        'name', i.caption,
        'status', i.status
      ),
      'admin', json_object(
        'id', u.id,
        'name', u.firstname || ' ' || u.lastname,
        'email', u.email
      ),
      'metrics', (
        SELECT json_object(
          'cpu', m.cpu_utilization,
          'memory', m.memory_utilization,
          'disk', m.disk_utilization
        )
        FROM metrics m
        WHERE m.node_id = n.id
        ORDER BY m.datetime DESC
        LIMIT 1
      ),
      'applications', (
        SELECT json_group_array(json_object(
          'id', a.id,
          'name', a.caption
        ))
        FROM applications a
        JOIN nodes_applications na ON a.id = na.application_id
        WHERE na.node_id = n.id
      )
    ))
    FROM nodes n
    LEFT JOIN statuses s ON n.status = s.Id
    LEFT JOIN interfaces i ON n.interface = i.id
    LEFT JOIN users u ON n.admin = u.id
    JOIN groups_nodes gn ON n.id = gn.node_id
    WHERE gn.group_id = g.id
  ) AS nodes
FROM groups g
