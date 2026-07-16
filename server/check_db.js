const Database = require('better-sqlite3');
const db = new Database('C:/Users/iamak/OneDrive/Desktop/freellmapi/server/data/freeapi.db');

// List all tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('=== TABLES ===');
tables.forEach(t => console.log(' -', t.name));

// Dump each table (first 5 rows)
console.log('\n=== DATA ===');
tables.forEach(t => {
  try {
    const rows = db.prepare('SELECT * FROM ' + t.name + ' LIMIT 5').all();
    console.log('\n[' + t.name + ']');
    rows.forEach(r => console.log(JSON.stringify(r)));
  } catch(e) {
    console.log('[' + t.name + '] error:', e.message);
  }
});
db.close();
