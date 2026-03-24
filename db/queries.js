const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users;");
  return rows;
}

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages;");
    return rows
}

async function addUser(user) {
  await pool.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);", 
    [user.firstname, user.lastname, user.email, user.password])
}

module.exports = {
  getAllUsers,
  getAllMessages,
  addUser
};