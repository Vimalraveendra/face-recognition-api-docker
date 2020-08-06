const express = require("express");
const { json } = require("express");

const app = express();

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
};

app.get("/", (req, res) => {
  res.send(database.users);
});

/* SignIn*/
app.post("/signin", (req, res) => {
  /* instead of using res.send() we can use res.json(). express  comes with a 
     build in JSON method on response that we can use and it has some added
     features when responding with json
    */
  // res.send("signinn");

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
  res.json("sigin");
});

/*Register*/

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
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
