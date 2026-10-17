const fs=require("fs");
const pool=require("./db");

async function createTables(){
    try{
        const sql=fs.readFileSync("./schema.sql","utf8");

        await pool.query(sql);
        console.log("Users and post table created successfully!")
    }catch(err){    
        console.error("Failed to create table:",err.message);
    }finally{
        await pool.end();
    }
}

createTables();