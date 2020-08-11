const handleSignIn = (req, res, bcrypt, db) => {
  // Load hash from your password DB.

  /* instead of using res.send() we can use res.json(). express  comes with a 
       build in JSON method on response that we can use and it has some added
       features when responding with json
      */
  // res.send("signinn");

  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash); // true
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json("Unable to get user"));
      } else {
        res.status(400).json("Wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("Wrong credentials"));
};

module.exports = {
  handleSignIn,
};
