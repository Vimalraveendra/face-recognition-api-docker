const handleSignIn = (req, res, bcrypt, db) => {
  // Load hash from your password DB.

  /* instead of using res.send() we can use res.json(). express  comes with a 
       build in JSON method on response that we can use and it has some added
       features when responding with json
      */
  // res.send("signinn");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Incorrect form submission");
  }

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash); // true
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
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
