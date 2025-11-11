import path from "path";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_POST || 5432;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const clientConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionTimeoutMillis: 10000,
};

describe("Database Connection Test", () => {
  test("should connect successfully to PostgreSQL database", async () => {
    if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
      throw new Error("Missing Env Variables: DB_USER, DB_PASSWORD, or DB_NAME");
    }

    const client = new Client(clientConfig);

    try {
      await client.connect();
      const result = await client.query("SELECT current_database(), current_user, version();");

      console.log("Connected successfully to:", result.rows[0].current_database);
      console.log("PostgreSQL Version:", result.rows[0].version);

      expect(result.rows[0].current_database).toBe(DB_NAME);
      expect(result.rows[0].current_user).toBe(DB_USER);
    } finally {
      await client.end();
    }
  });
});
