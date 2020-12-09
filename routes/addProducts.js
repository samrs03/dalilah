const router = require("express").Router();
const { mySqlConnectionObject } = require("../db/connectDB");
const { queries } = require("../config/dbQueries.json");
const { QueryTypes } = require("sequelize");
const authMiddlewares = require("../middlewares/auth");

router.use(authMiddlewares.authorizationMiddleware);
router.use(authMiddlewares.isAdmin);
router.post("/", async (req, res) => {
  if ("products" in req.body) {
    let insertedElements = [];
    let arrayOfPromises = [];
    req.body.products.forEach((element) => {
      if ("product_name" && "product_price" && "product_stock" in element) {
        insertedElements.push(element);
        arrayOfPromises.push(
          mySqlConnectionObject.query(queries.addingProducts, {
            replacements: {
              product_name: element.product_name,
              product_price: element.product_price,
              product_stock: element.product_stock,
            },
            type: QueryTypes.INSERT,
          })
        );
      }
    });
    Promise.all(arrayOfPromises)
      .then(() => {
        return res.status(200).json({
          message: "Operation terminated successfully",
          insertedItems: insertedElements,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error while inserting info to DB",
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
