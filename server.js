import express from  "express"
import colors from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import chatbotRoutes from "./routes/chatbot.js";
import mongoose from "mongoose";
import cors from "cors";
const path=require('path')
//configure env
dotenv.config();

//databse config
connectDb();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Beauty Store</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//production script
app.use(express.static("./client/build"));
app.get("*", (req,res)=>{
  res.sendFile(path.resolve(__dirname, "client", "build" , "index.html"))
})


//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});