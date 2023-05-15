const express = require("express");

const app = express();
const morgan = require("morgan");
const userRouter = require("./route/userRoute");
const { User, Classroom, Module, Session } = require("./models/scheduleModel");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { token } = require("morgan");
app.use(cors());
app.use(express.json());
Session.deleteMany();
const jwt_secret = "dskjdafjhkvhjak25454h21xc(0][]{}dfkjahpsofjv05";
app.get("/api", (req, res) => {
  Session.deleteMany();
  console.log("modified");
});
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  const encryptedpassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "user exists already" });
    }
    await User.create({
      username,
      email,
      password: encryptedpassword,
      role,
    });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.json({ error: "User does not exist" });
  }
  if (await bcrypt.compare(password, userExists.password)) {
    const token = jsonwebtoken.sign({ email: userExists.email }, jwt_secret);
    console.log(token);
    return res.json({ status: "success", data: token });
  } else {
    return res.json({ error: "Invalid password" });
  }
});

/* app.post('/userData', async (req, res) => {
  const { token } = req.body;
  try {
    const user = jsonwebtoken.verify(token, jwt_secret);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: 'success', data: data });
      })
      .catch((err) => {
        res.send({ status: 'error', error: err });
      });
  } catch (err) {}
});*/

module.exports = app;
