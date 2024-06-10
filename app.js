const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const redisClient = require("./utils/redisclient");

const connectionURL = `mongodb+srv://dikshyanta:${process.env.MONGO_PASS}@cluster0.gbkrivr.mongodb.net/redis?retryWrites=true&w=majority`;

const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;

//start function
const start = async () => {
  try {
    await redisClient.connect();
    await mongoose.connect(connectionURL);
    console.log("Mongo is live");
    app.listen(PORT, console.log(`Server live on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
