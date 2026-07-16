import Database from 'better-sqlite3';

const db = new Database('data/freeapi.db');

console.log('\n=== SETTINGS TABLE ===');
const settings = db.prepare("SELECT * FROM settings").all();
settings.forEach(r => console.log(JSON.stringify(r)));

console.log('\n=== PROVIDER KEYS (metadata only) ===');
try {
  const keys = db.prepare("SELECT id, platform, label, status, created_at FROM provider_keys LIMIT 10").all();
  keys.forEach(r => console.log(JSON.stringify(r)));
} catch(e) {
  // try alternate table name
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('Tables:', tables.map(t => t.name).join(', '));
  tables.forEach(t => {
    const rows = db.prepare('SELECT * FROM ' + t.name + ' LIMIT 2').all();
    console.log('\n[' + t.name + ']', JSON.stringify(rows));
  });
}

db.close();
