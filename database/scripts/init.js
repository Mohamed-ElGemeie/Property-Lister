const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const DB_HOST = process.env.DB_HOST;
const DB_PORT = 5432;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

function readSQL(file) {
  return fs.readFileSync(path.join(__dirname, "..", "sql", file), "utf-8");
}


async function initDatabase() {
  if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.error("Missing Env Variables: DB_USER, DB_PASSWORD, DB_NAME");
    process.exit(1);
  }

  const rootClient = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: "postgres",
  });

  try {
    await rootClient.connect();

    const checkDB = await rootClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1;`,
      [DB_NAME]
    );
    if (checkDB.rowCount === 0) {
      await rootClient.query(`CREATE DATABASE ${DB_NAME};`);
      console.log(`✅ Database '${DB_NAME}' created.`);
    } else {
      console.log(`ℹ️ Database '${DB_NAME}' already exists.`);
    }

    await rootClient.end();

    const client = new Client({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    await client.connect();

    await client.query(readSQL("create_enums.sql"));
    await client.query(readSQL("create_apartment_table.sql"));

    console.log("✅ Apartment table ready.");
    await client.end();
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  } finally {
    process.exit(0);
  }
}

initDatabase();
