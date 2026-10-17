const pool=require("./db");

async function deleteUser(){
    try{
        const userId=1;

        const query=`DELETE FROM users WHERE id=$1 RETURNING *`;

        const result=await pool.query(query,[userId]);

        if(result.rows.length===0){
            console.log("User not found. Nothing was deleted");
            return;
        }

        console.log("User deleted successfully!");
        console.log(result.rows[0]);
    }catch(err){
        console.error("Failed to delete User:",err.message);
    }finally{
        await pool.end();
    }
}

deleteUser();