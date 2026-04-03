const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users;");
  return rows;
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows
}

async function getAllMessagesWithAuthor() {
  const { rows } = await pool.query("SELECT * FROM messages LEFT JOIN users ON messages.author = users.id;")
  return rows
}

async function addUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const { rows } = await pool.query("INSERT INTO users (firstname, lastname, email, password)\
     VALUES ($1, $2, $3, $4) RETURNING *;",
    [user.firstname, user.lastname, user.email, hashedPassword])
  return rows[0]
}

async function addNewMessage(message) {
  await pool.query("INSERT INTO messages (title, content, timestamp, author) \
    VALUES ($1, $2, $3, $4);",
    [message.title, message.content, message.timestamp, message.author])
}

async function joinTheClub(user, secretCode) {
  const result = await pool.query("SELECT * FROM secret_code;");
  const actualSecretCode = result.rows[0].secretCode;
  console.log(`secretCode ${secretCode} actualSecretCode ${actualSecretCode}`)
  if (secretCode !== actualSecretCode) {
    return false
  }
  await pool.query("UPDATE users SET is_club_member = true WHERE id = $1;", [user.id])
  return true
}

module.exports = {
  getAllUsers,
  getAllMessages,
  addUser,
  addNewMessage,
  joinTheClub,
  getAllMessagesWithAuthor
};