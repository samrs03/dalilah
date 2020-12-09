const router = require("express").Router();
const { mySqlConnectionObject } = require("../db/connectDB");
const { queries } = require("../config/dbQueries.json");
const { QueryTypes } = require("sequelize");
const authMiddlewares = require("../middlewares/auth");

router.use(authMiddlewares.authorizationMiddleware);
router.use(authMiddlewares.isAdmin);
router.delete("/", async (req, res) => {
  if ("products" in req.body) {
    let deletedElements = [];
    let arrayOfPromises = [];
    req.body.products.forEach((element) => {
      console.log(element);
      deletedElements.push(element);
      arrayOfPromises.push(
        mySqlConnectionObject.query(queries.deletingProducts, {
          replacements: {
            product_name: element,
          },
          type: QueryTypes.DELETE,
        })
      );
    });
    Promise.all(arrayOfPromises)
      .then(() => {
        return res.status(200).json({
          message: "Operation terminated successfully",
          deletedItems: deletedElements,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error while DELETING info in DB",
          ErrorMessage: error,
        });
      });
  } else {
    return res.status(400).json({
      ErrorCode: "400",
      ErrorType: "Bad Request",
      message:
        "There was no information sent in the body or there was no products field in the json sent, please check the docs",
    });
  }
});

module.exports = {
  router,
};
