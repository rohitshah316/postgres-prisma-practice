const pool=require("./db");

async function testCascade(){
    const userId=7;

    try{
        //check how many post belong to this user
        const before=await pool.query(
            "SELECT COUNT(*)::int AS total FROM posts WHERE user_id=$1",[userId]
        );

        console.log("Posts before deletion:",before.rows[0].total);

         // Delete the user.
    const deleted = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, name",
      [userId]
    );

    if (deleted.rows.length === 0) {
      console.log("User not found. Nothing was deleted.");
      return;
    }

    console.log("Deleted user:", deleted.rows[0]);


    const after = await pool.query(
      "SELECT COUNT(*)::int AS total FROM posts WHERE user_id = $1",
      [userId]
    );

    console.log("Posts after deletion:", after.rows[0].total);
    }catch(err){
        console.error("Cascade test failed:",err.message);
    }finally{
        await pool.end();
    }
}

testCascade();