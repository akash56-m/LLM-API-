const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'freeapi.db');
const db = new Database(dbPath);

console.log("=== Top 20 Active Fallback Models ===");
const fallbacks = db.prepare(`
  SELECT fc.priority, m.id as model_id, m.platform, m.model_id as api_model_id, m.display_name, fc.enabled
  FROM fallback_config fc
  JOIN models m ON fc.model_db_id = m.id
  WHERE fc.enabled = 1
  ORDER BY fc.priority ASC
  LIMIT 20
`).all();
console.table(fallbacks);

db.close();
