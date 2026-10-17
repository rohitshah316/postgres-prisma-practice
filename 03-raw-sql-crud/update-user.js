const pool=require("./db");

async function updateUser() {
  try {
    const userId = 13;
    const newName = "Alex Shrestha";
    const newAge = 68;

    const query = `
      UPDATE users
      SET name = $1, age = $2
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(query, [
      newName,
      newAge,
      userId,
    ]);

    if (result.rows.length === 0) {
      console.log("User not found. Nothing was updated.");
      return;
    }

    console.log("User updated successfully!");
    console.log(result.rows[0]);
  } catch (err) {
    console.error("Failed to update user:", err.message);
  } finally {
    await pool.end();
  }
}

updateUser();