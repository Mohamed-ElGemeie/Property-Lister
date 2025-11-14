const { Client } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const DB_HOST = "localhost";
const DB_PORT = 5432;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const systemClient = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: "postgres",
});

async function dumpDatabase() {
  try {
    await systemClient.connect();

    const checkRes = await systemClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (checkRes.rowCount === 0) {
      console.log(`ℹ️ Database "${DB_NAME}" does NOT exist. Nothing to drop.`);
      return;
    }

    console.log(`⚠️ Database "${DB_NAME}" found. Dropping...`);

    await systemClient.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = $1 AND pid <> pg_backend_pid();
    `, [DB_NAME]);

    await systemClient.query(`DROP DATABASE "${DB_NAME}"`);
    console.log(`🗑️ Database "${DB_NAME}" dropped successfully.`);

  } catch (err) {
    console.error("❌ Dump failed:", err.message);
  } finally {
    await systemClient.end();
  }
}

dumpDatabase();
