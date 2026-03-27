require("dotenv").config();
const express = require("express");
const app = express();
const messagesRouter = require("./routes/messagesRouter");
const userRouter = require("./routes/userRouter");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Auth
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use("/", messagesRouter);
app.use("/", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
