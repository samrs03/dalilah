const router = require("express").Router();
const authMiddlewares = require("../middlewares/auth");
const { QueryTypes } = require("sequelize");
const { mySqlConnectionObject } = require("../db/connectDB");
const { queries } = require("../config/dbQueries.json");
router.use(authMiddlewares.authorizationMiddleware);
router.use(authMiddlewares.isAdmin);
router.get("/", async (req, res) => {
  mySqlConnectionObject
    .query(queries.listingUsers, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      return res.status(200).json({ users: result });
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
});
module.exports = {
  router,
};
