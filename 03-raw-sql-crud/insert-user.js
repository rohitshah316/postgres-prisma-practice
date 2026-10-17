const pool=require("./db");

async function insertUser(){
    try{
        const name="Alex";
        const email="alex@gmail.com";
        const age=67;

        const query=`INSERT INTO users (name,email,age) VALUES ($1,$2,$3) RETURNING *`;

        const result=await pool.query(query,[name,email,age]);

        console.log("User inserted successfully!");
        console.log(result.rows[0]);
    }catch(err){
        console.error("Failed to insert user:");
        console.error(err.message);

    }finally{
        await pool.end();
    }

}

insertUser();