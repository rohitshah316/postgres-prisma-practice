
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
    // Step 1: Deduct 200 from Alex.
    await pool.query(
      `UPDATE accounts
       SET balance = balance - $1
       WHERE account_name = $2`,
      [200.00, "Alex"]
    );

    console.log("Alex: 200.00 deducted.");

    // Step 2: Simulate a failure before crediting Ani.
    throw new Error("Simulated failure before crediting Ani");

    // This statement will never execute.
    await pool.query(
      `UPDATE accounts
       SET balance = balance + $1
       WHERE account_name = $2`,
      [200.00, "Ani"]
    );
  } catch (error) {
    console.error("Transfer failed:", error.message);
  } finally {
    await pool.end();
  }
}

main();
