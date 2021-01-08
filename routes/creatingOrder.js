const router = require("express").Router();
const { mySqlConnectionObject } = require("../db/connectDB");
const { queries } = require("../config/dbQueries.json");
const { QueryTypes, INTEGER } = require("sequelize");
const authMiddlewares = require("../middlewares/auth");

router.use(authMiddlewares.authorizationMiddleware);

router.post("/", async (req, res) => {
  if ("order_description" && "order_pay_method" in req.body) {
    const today = new Date();
    const fullDateis = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()} ${
      today.getHours() + 5
    }:${today.getMinutes()}:${today.getSeconds()}`;
    let totalPrice = 0;
    req.body.order_description.forEach((element) => {
      totalPrice += element.product_price * element.quantity;
    });
    mySqlConnectionObject
      .query(queries.creatingOrder, {
        replacements: {
          order_status: "new",
          order_date: fullDateis,
          order_description: JSON.stringify(req.body.order_description),
          order_pay_method: req.body.order_pay_method,
          order_price: totalPrice,
          user_id: authMiddlewares.gettingUserID(),
        },
        type: QueryTypes.INSERT,
      })
      .then(() => {
        return res
          .status(200)
          .json({
            message: "Order created",
            order_description: req.body.order_description,
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
