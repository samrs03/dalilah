const router = require("express").Router();
const authMiddlewares = require("../middlewares/auth");
const { QueryTypes } = require("sequelize");
const { mySqlConnectionObject } = require("../db/connectDB");
const { queries } = require("../config/dbQueries.json");
router.use(authMiddlewares.authorizationMiddleware);
router.post("/", async (req, res) => {
  if (
    "user_name" &&
    "user_email" &&
    "user_full_name" &&
    "user_phone" &&
    "user_address" &&
    "user_password" in req.body
  ) {
    mySqlConnectionObject
      .query(queries.registeringUsers, {
        replacements: {
          user_name: req.body.user_name,
          user_email: req.body.user_email,
          user_full_name: req.body.user_full_name,
          user_phone: req.body.user_phone,
          user_address: req.body.user_address,
          user_password: req.body.user_password,
          user_rol: 0,
        },
        type: QueryTypes.INSERT,
      })
      .then(() => {
        return res
          .status(200)
          .json({ message: "Information successfully inserted in the DB" });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "There was an error while trying to insert in the DB",
          errorMessage: error,
        });
      });
  } else {
    return res.status(400).json({
      ErrorCode: "400",
      ErrorType: "Bad Request",
      message:
        "There are key missing in the json sent in the body of the request",
    });
  }
});
module.exports = {
  router,
};
