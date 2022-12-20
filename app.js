require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json()); 

const port = process.env.APP_PORT ?? 5000;



const welcome = (req, res) => {
  res.send("Welcome to my favourite user list");
};

app.get("/", welcome);



const userHandlers = require("./userHandlers");
const { hashPassword } = require("./auth.js");

app.post("/api/users", hashPassword, userHandlers.postUser);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
/* app.post("/api/users", userHandlers.postUser); */
app.put("/api/users/:id", userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
