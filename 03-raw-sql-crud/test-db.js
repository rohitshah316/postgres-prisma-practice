const pool= require("./db");

async function testConnection(){
    try{
        const result= await pool.query(
            "SELECT NOW() AS current_time"
        )

        console.log("Database connected successfully!");
        console.log("PostgresSQL time:",result.rows[0].current_time)
    }catch(err){
        console.error("Database connection failed:");
        console.error(err.message);
    }finally{
        await pool.end();
    }
}

testConnection()