const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const http = require("http");
const server = express();

server.use(bodyParser.json());

const loginUsersRouter = require("./routes/loginUser").router;
server.use("/api/v1/dalilah/users/login", loginUsersRouter);

const listingUsersRouter = require("./routes/listingUsers").router;
server.use("/api/v1/dalilah/users/list", listingUsersRouter);

const registeringUsersRouter = require("./routes/registeringUser").router;
server.use("/api/v1/dalilah/users/register", registeringUsersRouter);

const listingProductsRouter = require("./routes/listingProducts").router;
server.use("/api/v1/dalilah/products/list", listingProductsRouter);

const addProductsRouter = require("./routes/addProducts").router;
server.use("/api/v1/dalilah/products/add", addProductsRouter);

const deletingProductsRouter = require("./routes/deletingProducts").router;
server.use("/api/v1/dalilah/products/delete", deletingProductsRouter);

const updatingProductsRouter = require("./routes/updatingProducts").router;
server.use("/api/v1/dalilah/products/update", updatingProductsRouter);

const creatingOrderRouter = require("./routes/creatingOrder").router;
server.use("/api/v1/dalilah/orders/create", creatingOrderRouter);
http.createServer(server).listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
