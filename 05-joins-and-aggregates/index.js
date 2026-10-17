require("dotenv").config();

const {Pool}=require("pg");

const pool=new Pool({
    host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function main(){
    try{
       const result = await pool.query(`
      SELECT
        u.name,
        COUNT(p.id) AS total_posts
      FROM users AS u
      LEFT JOIN posts AS p
        ON u.id = p.user_id
      GROUP BY u.id, u.name
      ORDER BY total_posts DESC, u.name;
    `);

        console.log("Database connection successful!");
        console.log(result.rows);
    }catch(err){
        console.error("Database connection failed:",err.message);
    }finally{
        await pool.end();
    }
}

main();