const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require('../db');

// Получение всех групп с нодами
router.get('/groups', async (req, res) => {
  try {
    const sql = fs.readFileSync(
      path.resolve(process.env.BASEDIR, 'sql/groups.sql')
    ).toString();
    
    const data = await db(sql);
    
    // Преобразуем JSON-строки в объекты
    const processedData = data.map(group => {
      try {
        return {
          ...group,
          nodes: group.nodes ? JSON.parse(group.nodes) : []
        };
      } catch (e) {
        console.error('Error parsing group nodes:', e);
        return {
          ...group,
          nodes: []
        };
      }
    });
    
    res.json(processedData);
  } catch (err) {
    console.error('Groups route error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение метрик
router.get('/metrics', async (req, res) => {
  try {
    const sql = fs.readFileSync(
      path.resolve(process.env.BASEDIR, 'sql/metrics.sql')
    ).toString();
    
    const data = await db(sql);
    res.json(data);
  } catch (err) {
    console.error('Metrics route error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение нод для конкретной группы
router.get('/groups/:groupId/nodes', async (req, res) => {
  try {
    const { groupId } = req.params;
    const sql = fs.readFileSync(
      path.resolve(process.env.BASEDIR, 'sql/nodes.sql')
    ).toString();
    
    const data = await db(sql, [groupId]);
    res.json(data);
  } catch (err) {
    console.error('Nodes route error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;