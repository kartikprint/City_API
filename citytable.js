const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "city.db");

const createTable = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS city (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      population INTEGER NOT NULL,
      country TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL
    );
  `;

  try {
    await db.run(createTableQuery);
    console.log("City table created successfully");
  } catch (error) {
    console.error("Error creating table:", error.message);
  } finally {
    await db.close();
  }
};

createTable();
