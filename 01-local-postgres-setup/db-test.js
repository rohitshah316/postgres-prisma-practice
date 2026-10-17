require("dotenv").config();
const { Client } = require("pg")
const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function main() {
    try {
        await client.connect();
        console.log("Connected to PostgresSQL!");

        const result = await client.query(
            "SELECT current_user, current_database(), NOW() AS server_time"
        );

        console.log(result.rows[0]);
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exitCode=1;
    } finally {
        await client.end().catch(()=>{});
    }
}

main();