require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function main(){
    try{
    const accounts = await pool.query(
      `INSERT INTO accounts (account_name, balance)
       VALUES
         ($1, $2),
         ($3, $4)
       RETURNING id, account_name, balance`,
      ["Alex", 1000.00, "Ani", 500.00]
    );

    console.log("Accounts created:");
    console.table(accounts.rows);
    }catch(err){
        console.error("Failed to seed accounts:", error.message);
    process.exitCode = 1;
    }finally{
        await pool.end();
    }
}

main();