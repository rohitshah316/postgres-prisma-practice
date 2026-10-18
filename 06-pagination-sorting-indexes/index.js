require("dotenv").config();

const {Pool} = require("pg");

const pool=new Pool({
        host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

async function main(){
    try{
        //1. test the databse connection
        const connection=await pool.query(
            "SELECT current_database(), current_user"
        );

        console.log("Connected:",connection.rows[0]);


        //2. fetch the newwest 10 posts
        const newestPosts=await pool.query(
            `SELECT id,title,created_at
            FROM posts
            ORDER BY created_at DESC, id DESC
            LIMIT 10`
        );

        console.log("\nNewest posts:");
        console.table(newestPosts.rows);


        //3. offset pagination: fetch 5 rows after skipping
        const page=2;
        const pageSize=5;
        const offset=(page-1)*pageSize;

        const offsetPage=await pool.query(
            `SELECT id,title
            FROM posts
            ORDER BY id ASC
            LIMIT $1 OFFSET $2`,[pageSize,offset]
        );

        console.log("\nOFFSET page 2:");
        console.table(offsetPage.rows);


        //4. keyset pagination: fetch rows after id 12
        const cursor=12;

        const nextPage= await pool.query(
            `SELECT id,title
            FROM posts
            WHERE id>$1
            ORDER BY id ASC
            LIMIT $2`,[cursor,pageSize]
        );

        console.log("\nKeyset page after ID 12:");
        console.table(nextPage.rows)
    }catch(err){    
        console.error("Database error:",err.message);
        process.exitCode=1;
    }finally{
        await pool.end();
    }
}

main();