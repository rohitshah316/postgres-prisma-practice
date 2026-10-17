const fs=require("fs");
const pool=require("./db");

async function createManyToManyTables(){
    try{
        const sql=fs.readFileSync("./many-to-many.sql","utf8");
        await pool.query(sql);
        console.log("Tags and post_tags tables created successfully!");
    }catch(err){
        console.error("Failed to create tables:",err.message);
    }finally{
        await pool.end();
    }
}

createManyToManyTables();