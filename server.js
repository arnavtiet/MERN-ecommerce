// import  dotenv from dotenv
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./config/database.js");
const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoutes.js");
const productRoute = require("./routes/productRoute.js");
require("dotenv").config();
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//database
connectDB;

//routes
app.use("/api/v1/auth", authRoute.router);
app.use("/api/v1/category", categoryRoute.routes);
app.use("/api/v1/product", productRoute.routes);

//listen
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send({ message: "hello" });
});
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
