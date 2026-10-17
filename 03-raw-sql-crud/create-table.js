const fs=require("fs");
const pool=require("./db");

async function createTable(){
    try{
        const sql=fs.readFileSync("./schema.sql","utf8");

        await pool.query(sql);

        console.log("Users table created successfully");
    }catch(err){
        console.error("Failed to create table:");
        console.error(err.message);
    }finally{
        await pool.end();
    }
}

createTable();