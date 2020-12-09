const router = require("express").Router();
const { mySqlConnectionObject } = require("../db/connectDB");
const { queries } = require("../config/dbQueries.json");
const { QueryTypes } = require("sequelize");
const authMiddlewares = require("../middlewares/auth");

router.use(authMiddlewares.authorizationMiddleware);
router.get("/", async (req, res) => {
  mySqlConnectionObject
    .query(queries.listingProducts, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      return res.status(200).json({ products: result });
    })
    .catch((error) => {
      return res.status(500).json({
        message:
          "There was an error while retrieving products' information from DB",
        errorMessage: error,
      });
    });
});
module.exports = {
  router,
};
