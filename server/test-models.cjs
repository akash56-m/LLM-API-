const Database = require('better-sqlite3');
const path = require('path');
const fetch = require('node-fetch'); // node-fetch might be in node_modules, let's check or use dynamic import/native fetch

async function run() {
  const dbPath = path.join(__dirname, 'data', 'freeapi.db');
  const db = new Database(dbPath);

  const activeModels = db.prepare(`
    SELECT fc.priority, m.id as model_db_id, m.platform, m.model_id, m.display_name
    FROM fallback_config fc
    JOIN models m ON fc.model_db_id = m.id
    WHERE fc.enabled = 1
    ORDER BY fc.priority ASC
  `).all();

  console.log(`Found ${activeModels.length} active models in fallback chain.`);

  // Let's inspect the first 10 and print their status
  db.close();
}
run();
