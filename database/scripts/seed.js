const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const DB_HOST = "localhost";
const DB_PORT = 5432;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

function readSQL(file) {
  return fs.readFileSync(path.join(__dirname, "..", "sql", file), "utf-8");
}


async function seed() {
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  try {
    await client.connect();
    const res = await client.query(readSQL("seed_apartments.sql"));
    console.log(`✅ Seeded ${res.rowCount} apartments.`);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await client.end();
  }
}

seed();
