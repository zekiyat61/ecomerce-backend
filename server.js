import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./Config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import mongoose from "mongoose";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
// App Config
const app = express();
const PORT = 5020;

mongoose
  .connect(process.env.MONGODB_URL)

  .then(() => {
    console.log("App connected to database");
    connectCloudinary();
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
  res.send("API Working");
});
