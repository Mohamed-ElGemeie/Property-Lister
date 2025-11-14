import path from "path";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

describe("Apartment Table Tests", () => {
  test("Apartment table exists and has 22 rows", async () => {
    const client = new Client({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    try {
      await client.connect();


      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'apartment'
        );
      `);
      expect(tableCheck.rows[0].exists).toBe(true);


      const rowCount = await client.query(`SELECT COUNT(*) FROM apartment;`);
      console.log("Apartment table row count:", rowCount.rows[0].count);
      expect(Number(rowCount.rows[0].count)).toBe(22);

    } finally {
      await client.end();
    }
  });
});
