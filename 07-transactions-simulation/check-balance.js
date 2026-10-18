
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function main() {
  try {
    const result = await pool.query(`
      SELECT id, account_name, balance
      FROM accounts
      ORDER BY id
    `);

    console.table(result.rows);

    const total = await pool.query(`
      SELECT SUM(balance) AS total_balance
      FROM accounts
    `);

    console.log("Total balance:", total.rows[0].total_balance);
  } catch (error) {
    console.error("Failed to check balances:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
