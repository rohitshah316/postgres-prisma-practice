const pool=require("./db");


async function testErrors(){
    try{
        //test 1: duplicate email
        try{
            await pool.query(`INSERT INTO users (name,email,age) VALUES ($1,$2,$3)`,["Smart Alex","alex@gmail.com",20]);

            console.log("Duplicate insert unexpectedly succeeded.");
        }catch(err){
            if(err.code==="23505"){
                console.log("Duplicate email rejected correctly.");
            }else{
                throw err;
            }
        }


        //test 2: invalid age
        try {
      await pool.query(
        `INSERT INTO users (name, email, age)
         VALUES ($1, $2, $3)`,
        ["Young User", "young@example.com", 16]
      );

      console.log("Invalid age unexpectedly succeeded.");
    } catch (err) {
      if (err.code === "23514") {
        console.log("Invalid age rejected correctly.");
      } else {
        throw err;
      }
    }
    }catch(err){
        console.error("Unexpected database error:",err.message);
    }finally{
        await pool.end();
    }
}

testErrors();


//23505 - unique constraint violation
//23514 - check constraint violation
