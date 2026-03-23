require('dotenv').config()
const express = require("express");
const app = express();
const messagesRouter = require("./routes/messagesRouter")

app.use("/", messagesRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {throw error}
  console.log(`My first Express app - listening on port ${PORT}!`);
});