const pool=require("./db");

async function tagsDemo(){
    try{
        //1. find an existing post.
        let postResult=await pool.query(
            "SELECT id, title FROM posts ORDER BY id LIMIT 1"
        );

        if(postResult.rows.length===0){
            const userResult=await pool.query(
                `INSERT INTO users (name, email, age)
         VALUES ($1, $2, $3)
         RETURNING id`,
        ["Ani", "ani@gmail.com", 20]
            )

        
             const post = await pool.query(
        `INSERT INTO posts (title, content, user_id)
         VALUES ($1, $2, $3)
         RETURNING id, title`,
        ["Learning PostgreSQL", "Practising many-to-many relationships.", userResult.rows[0].id]
      );
        postResult={rows:[post.rows[0]]}
        }

        const post=postResult.rows[0];
        console.log("Selected post:",post);


         // 2. Create or reuse tags.
    const tagNames = ["postgresql", "javascript", "tutorial"];
    const tags = [];

    for (const name of tagNames) {
      const result = await pool.query(
        `INSERT INTO tags (name)
         VALUES ($1)
         ON CONFLICT (name)
         DO UPDATE SET name = EXCLUDED.name
         RETURNING id, name`,
        [name]
      );

      tags.push(result.rows[0]);
    }

    console.log("Tags:", tags);

    // 3. Connect every tag to this post.
    for (const tag of tags) {
      await pool.query(
        `INSERT INTO post_tags (post_id, tag_id)
         VALUES ($1, $2)
         ON CONFLICT (post_id, tag_id) DO NOTHING`,
        [post.id, tag.id]
      );
    }

    console.log("Tags connected to post successfully!");

    // 4. Fetch the post with its tags.
    const result = await pool.query(
      `SELECT
         p.id AS post_id,
         p.title,
         t.id AS tag_id,
         t.name AS tag_name
       FROM posts AS p
       JOIN post_tags AS pt ON pt.post_id = p.id
       JOIN tags AS t ON t.id = pt.tag_id
       WHERE p.id = $1
       ORDER BY t.name`,
      [post.id]
    );

    console.log("Post and tags:");
    console.table(result.rows);
    }catch(err){

    }finally{
        await pool.end();
    }
}

tagsDemo();