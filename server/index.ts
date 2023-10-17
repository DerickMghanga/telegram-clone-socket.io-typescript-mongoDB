import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import {Server} from "socket.io";
import { User } from "./models/userModel";
const jwt = require("jsonwebtoken");


const app = express();
const server = http.createServer(app);
const {PORT} = process.env || 4000;


app.use(cors());
app.use(express.json());

//connect to MongoDB and Start(run) Server
mongoose.connect(process.env.MONGO_URL!);
const dbConnect = mongoose.connection;

dbConnect.on("error", console.error.bind(console, "connection error:"));

dbConnect.once("open", () => {
    console.log("Connected to MongoDB");

    // Start Express Server(run)
    server.listen(PORT, () => {
        console.log(`Server running on PORT:${process.env.PORT}`);
    });

})


//New server for Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
})

io.on("connection", (socket) => {

    //refresh user list after a new user joined
    socket.on("joined", () => {
        io.sockets.emit("new-user", "new user joined");
    })

    socket.on("private message", async(to, message, mySelf) => {
        const user = await User.find({ email:to });  //send to

        const decoded = jwt.verify(mySelf, process.env.ACCESS_TOKEN_SECRET!);

        const sender = await User.findById(decoded);  //me


        if (user) {
            user[0].messages.push({   
                receiver: user[0].email,
                message,
                sender: sender?.email,
                time: new Date(),
            })

            sender?.messages.push({   
                receiver: user[0].email,
                message,
                sender: sender?.email,
                time: new Date(),
            })

            await user[0].save();  //update reciever userSchema
            await sender?.save();  //update sender userSchema

            io.sockets.emit("refresh", "new Message");  //triger refresh in MessagesList.tsx after updating
        }
    })
})



//Rout Handlers
app.use("/", userRouter);

