import Database from 'better-sqlite3';

const db = new Database('data/freeapi.db');

// Delete all broken encrypted provider keys
const deleted = db.prepare("DELETE FROM api_keys").run();
console.log(`Deleted ${deleted.changes} broken provider key(s)`);

// Clear all requests log too (optional, fresh start)
// db.prepare("DELETE FROM requests").run();

// Remove any old encryption_key from settings (if it exists)
db.prepare("DELETE FROM settings WHERE key = 'encryption_key'").run();

// Show remaining settings
const settings = db.prepare("SELECT * FROM settings").all();
console.log('\nRemaining settings:', JSON.stringify(settings, null, 2));

db.close();
console.log('\nDone. Now restart the server — it will use ENCRYPTION_KEY from .env.');
console.log('Then re-add your Google AI Studio and Groq API keys via the dashboard.');
