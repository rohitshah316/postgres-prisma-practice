
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
  const client = await pool.connect();
  let transactionStarted = false;

  try {
    const senderName = "Alex";
    const receiverName = "Ani";
    const amount = 200.00;

    if (amount <= 0) {
      throw new Error("Transfer amount must be positive.");
    }

    await client.query("BEGIN");
    transactionStarted = true;

    // Lock both accounts in a consistent order.
    const lockedAccounts = await client.query(
      `SELECT id, account_name, balance
       FROM accounts
       WHERE account_name = ANY($1::varchar[])
       ORDER BY id
       FOR UPDATE`,
      [[senderName, receiverName]]
    );

    const accountsByName = new Map(
      lockedAccounts.rows.map((account) => [
        account.account_name,
        account,
      ])
    );

    const sender = accountsByName.get(senderName);
    const receiver = accountsByName.get(receiverName);

    if (!sender || !receiver) {
      throw new Error("Sender or receiver account does not exist.");
    }

    if (Number(sender.balance) < amount) {
      throw new Error("Insufficient funds.");
    }

    // Deduct money from the sender.
    await client.query(
      `UPDATE accounts
       SET balance = balance - $1
       WHERE id = $2`,
      [amount, sender.id]
    );

    // Credit money to the receiver.
    await client.query(
      `UPDATE accounts
       SET balance = balance + $1
       WHERE id = $2`,
      [amount, receiver.id]
    );

    await client.query("COMMIT");
    transactionStarted = false;

    console.log(`Transferred ${amount.toFixed(2)} from ${senderName} to ${receiverName}.`);
  } catch (error) {
    if (transactionStarted) {
      await client.query("ROLLBACK");
      transactionStarted = false;
      console.log("Transaction rolled back.");
    }

    console.error("Transfer failed:", error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
