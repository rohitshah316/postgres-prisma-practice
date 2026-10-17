const pool=require("./db");

async function relationsDemo(){
    try{
        //1. create a user
    const userResult=await pool.query(
        `INSERT INTO users (name,email,age) 
        VALUES ($1,$2,$3)
        RETURNING id,name,email
        `
        ,["Ani","ani@gmail.com",20]
    );

    const user=userResult.rows[0];
    console.log("User created:",user);

    //create a post belonging to that user
    const postResult=await pool.query(
        `INSERT INTO posts (title,content,user_id)
        VALUES ($1,$2,$3) RETURNING *
        `
        ,["My first post","Learning postgres relationships. It is fun.",user.id]
    );

    console.log("Post created:",postResult.rows[0]);
    }catch(err){
        console.error("Failed to create relation",err.message);
    }finally{
        await pool.end();
    }
}

relationsDemo();