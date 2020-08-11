const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        throw error;
      }
    })
    .catch((err) => {
      res.status(404).json("user not found");
    });
};

module.exports = {
  handleProfileGet,
};
