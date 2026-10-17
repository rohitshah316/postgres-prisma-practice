
const pool = require("./db");

async function runCrudPractice() {
  let userId;

  try {
    // 1. CREATE
    const inserted = await pool.query(
      `INSERT INTO users (name, email, age)
       VALUES ($1, $2, $3)
       RETURNING *`,
      ["Ani", "ani@gmail.com", 20]
    );

    const newUser = inserted.rows[0];
    userId = newUser.id;

    console.log("1. User created:", newUser);

    // 2. READ
    const found = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    console.log("2. User found:", found.rows[0]);

    // 3. UPDATE
    const updated = await pool.query(
      `UPDATE users
       SET name = $1, age = $2
       WHERE id = $3
       RETURNING *`,
      ["Ani Updated", 21, userId]
    );

    console.log("3. User updated:", updated.rows[0]);

    // 4. DELETE
    const deleted = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );

    console.log("4. User deleted:", deleted.rows[0]);

    // 5. VERIFY DELETION
    const check = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    console.log(
      "5. User exists after deletion:",
      check.rows.length > 0
    );
  } catch (err) {
    if (err.code === "23505") {
      console.error("Email already exists. Choose another email.");
    } else {
      console.error("CRUD practice failed:", err.message);
    }
  } finally {
    await pool.end();
  }
}

runCrudPractice();
