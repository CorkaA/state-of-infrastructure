const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'sqlite3.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
    console.error('Database path:', dbPath);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

module.exports = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    console.log('Executing SQL:', sql); // Логируем запросы
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('SQL Error:', err.message);
        reject(new Error('Database query failed: ' + err.message));
      } else {
        console.log('Query returned', rows?.length, 'rows');
        resolve(rows || []);
      }
    });
  });
};
