const pool=require("./db");

async function testForeignKey(){
    try{
        await pool.query(
            `INSERT INTO posts (title,content, user_id)
            
            VALUES ($1,$2,$3) RETURNING *`,["Invalid post","This post has no real author.",999]
        )

        console.log("post inserted successfully.")
    }catch(err){
        if(err.code==="23503"){
            console.log("Foreign key violation detected!");
            console.log("Postgres rejected the non existent user ID.");
        }else{
            console.error("Unexpected error:",err.message);
        }
    }finally{
        await pool.end();
    }
}

testForeignKey();