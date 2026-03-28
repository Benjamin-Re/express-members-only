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

async function addNewMessage(message) {
  await pool.query("INSERT INTO messages (title, content) VALUES ($1, $2);", [message.title, message.content])
}

module.exports = {
  getAllUsers,
  getAllMessages,
  addUser,
  addNewMessage
};