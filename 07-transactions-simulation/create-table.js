require("dotenv").config();

const {Pool}= require("pg");
const fs=require("node:fs/promises");
const path=require("node:path");

const pool= new Pool({
    host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function main(){
    try{
        const schemaPath=path.join(__dirname,"schema.sql");
        const schema=await fs.readFile(schemaPath,"utf8");

        await pool.query(schema);

        console.log("Accounts table created.");

        const result=await pool.query(
            `SELECT table_name FROM information_schema.tables
            WHERE table_schema='public'
            AND table_name='accounts';
            `
        );

        console.log("Verified table:",result.rows[0]?.table_name);

    }catch(err){
        console.error("Databse error:",err.message);
        process.exitCode=1;
    }finally{
        await pool.end();
    }
}

main();