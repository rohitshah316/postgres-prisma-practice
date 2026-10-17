const pool=require("./db");

async function getUsers(){
    try{

        //1. get all users
        const result= await pool.query("SELECT * FROM users ORDER BY id ASC");

        console.log("Users fetched Successfully!");
        console.log(result.rows);

        //2. get one user by id
        const userId=1;
        const singleUser=await pool.query(`SELECT * FROM users WHERE id=$1`,[userId]);

        console.log("\nUser with ID: 1");
        if (singleUser.rows.length === 0) {
    console.log("User not found");
} else {
    console.log(singleUser.rows[0]);
}

        //3. filter by age
        const olderUsers=await pool.query("SELECT * FROM users WHERE  age>=$1 ORDER BY age DESC",[60]);

        console.log("\nUsers aged 60 or older:");
    console.log(olderUsers.rows);
    }catch(err){
        console.error("Failed to get User:");
        console.error(err.message);
    }finally{
        await pool.end();
    }
}

getUsers();