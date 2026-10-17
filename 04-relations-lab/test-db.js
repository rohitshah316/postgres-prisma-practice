const pool=require("./db");

async function testConnection(){
    try{
        const result=await pool.query(
            "SELECT current_database() as database, current_user AS username, NOW() AS current_time"
        )

        console.log("Database connected successfully!");
        console.log(result.rows[0]);
    }catch(err){
        console.error("Database Connection failed:",err.message);
    }finally{
        await pool.end();
    }
}

testConnection();