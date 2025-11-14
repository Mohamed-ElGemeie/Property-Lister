import path from "path";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

describe("PostgreSQL Default DB Connection", () => {
  test("Connects to 'postgres' database", async () => {
    const client = new Client({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: "postgres",
    });

    try {
      await client.connect();
      const result = await client.query("SELECT current_database(), current_user;");
      console.log("Connected to:", result.rows[0].current_database);
      expect(result.rows[0].current_database).toBe("postgres");
    } finally {
      await client.end();
    }
  });
});
