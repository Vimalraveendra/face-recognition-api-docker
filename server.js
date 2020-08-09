const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

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

const database = {
  users: [
    {
      id: "123",
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

/* SignIn*/
app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    "apples",
    "$2a$10$jQcPsgQjMgBgB0ht2DrTqewVVHdWnOEidK9XOt22RgslhuEX1cLAq",
    function (err, res) {
      // res == true
      console.log("first guess");
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$jQcPsgQjMgBgB0ht2DrTqewVVHdWnOEidK9XOt22RgslhuEX1cLAq",
    function (err, res) {
      // res = false
      console.log("second guess");
    }
  );
  /* instead of using res.send() we can use res.json(). express  comes with a 
     build in JSON method on response that we can use and it has some added
     features when responding with json
    */
  // res.send("signinn");

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
  res.json("sigin");
});

/*Register*/

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // bcrypt.hash(password, null, null, function (err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash);
  // });
  // database.users.push({
  //   id: "125",
  //   name,
  //   email,
  //   password,
  //   entries: 0,
  //   joined: new Date(),
  // });
  db("users")
    .returning("*")
    .insert({
      name,
      email,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      res.status(400).json("unable to register");
    });
});

/* user home profile */
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  database.users.forEach((user) => {
    if (user.id === id) {
      return res.json(user);
    }
  });

  res.status(404).json("user not found");
});

/* image endpoint */

app.put("/image", (req, res) => {
  const { id } = req.body;
  database.users.forEach((user) => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
  });

  res.status(404).json("user not found");
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
