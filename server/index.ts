import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";


const app = express();
const server = http.createServer(app);
const {PORT} = process.env || 4000;


app.use(cors());

//connect to MongoDB and Start(run) Server
mongoose.connect(process.env.MONGO_URL!);
const dbConnect = mongoose.connection;

dbConnect.on("error", console.error.bind(console, "connection error:"));

dbConnect.once("open", () => {
    console.log("Connected to MongoDB");

    // Start Server(run)
    server.listen(PORT, () => {
        console.log(`Server running on PORT:${process.env.PORT}`);
    });

})


//Middlewares
app.use("/", userRouter);

