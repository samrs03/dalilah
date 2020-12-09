const router = require("express").Router();
const config = require("config");
const { mySqlConnectionObject } = require("../db/connectDB");
const { queries } = require("../config/dbQueries.json");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { user, pass } = req.body;
  mySqlConnectionObject
    .query(queries.login, {
      replacements: [user],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      if (result.length == 0 || pass != result[0].user_password) {
        return res.status(400).json({
          ErrorCode: "400",
          ErrorType: "Bad Request",
          message: "The password or username is wrong",
        });
      }
      if (user == result[0].user_name && pass == result[0].user_password) {
        const id = result[0].user_id;
        const rol = result[0].user_rol;
        const payload = { id, user, pass, rol };
        const jsonwToken = jwt.sign(payload, config.jwtSecretKey, {
          expiresIn: 3600,
        });
        return res.status(200).json({ token: jsonwToken });
      }
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
});

module.exports = {
  router,
};
