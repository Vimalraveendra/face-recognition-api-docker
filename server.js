const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./Controllers/register");
const signIn = require("./Controllers/signIn");
const profile = require("./Controllers/profile");
const image = require("./Controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "smart-database",
  },
});

// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(database.users);
});

/* SignIn*/
app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, bcrypt, db);
});

/*Register*/

app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

/* user home profile */
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

/* image endpoint */

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

//  you might be wondering here with the signIn if we are not creating a new user
// why  are we using a post?And if you remember any time  we are sending a
// password  we don't really want to send  it as a query string . we want to send
//  it inside of the body  ideally over  HTTPs so that  its hidden from man in the
//  middle  attacks and its secure.
/* end points
/ -->res= this is working
/ signIn-->POST  = success or fail
/ register -->POST = user
/profile /:userId -->GET = user
/image -->PUT = user

*/
