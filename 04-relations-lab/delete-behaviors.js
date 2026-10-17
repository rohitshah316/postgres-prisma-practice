
const pool = require("./db");

async function testDeleteBehaviors() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TEMP TABLE test_users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      )
    `);

    await client.query(`
      CREATE TEMP TABLE restricted_posts (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL
          REFERENCES test_users(id) ON DELETE RESTRICT
      )
    `);

    await client.query(`
      CREATE TEMP TABLE nullable_posts (
        id SERIAL PRIMARY KEY,
        user_id INT
          REFERENCES test_users(id) ON DELETE SET NULL
      )
    `);

    const user = await client.query(
      "INSERT INTO test_users (name) VALUES ($1) RETURNING id",
      ["Test User"]
    );

    const userId = user.rows[0].id;

    await client.query(
      "INSERT INTO restricted_posts (user_id) VALUES ($1)",
      [userId]
    );

    await client.query(
      "INSERT INTO nullable_posts (user_id) VALUES ($1)",
      [userId]
    );

    // Test RESTRICT.
    try {
      await client.query(
        "DELETE FROM test_users WHERE id = $1",
        [userId]
      );

      console.log("RESTRICT: Unexpectedly allowed deletion.");
    } catch (err) {
      if (err.code === "23001" || err.code === "23503") {
        console.log("RESTRICT: User deletion blocked.");
      } else {
        throw err;
      }
    }

    // Remove the child row blocking deletion.
    await client.query(
      "DELETE FROM restricted_posts WHERE user_id = $1",
      [userId]
    );

    // Test SET NULL.
    await client.query(
      "DELETE FROM test_users WHERE id = $1",
      [userId]
    );

    const remaining = await client.query(
      "SELECT user_id FROM nullable_posts"
    );

    console.log("SET NULL: Post preserved.");
    console.log("Post user_id:", remaining.rows[0].user_id);
  } catch (err) {
    console.error("Test failed:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

testDeleteBehaviors();
