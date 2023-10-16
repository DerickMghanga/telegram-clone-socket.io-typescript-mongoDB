import { Request, Response, Router } from "express";
const jwt = require("jsonwebtoken");
import { User } from "../models/userModel";
import "dotenv/config";

const router = Router();


//authorize users(Login)
router.post("/auth", async(req:Request, res:Response) => {
    const user = new User(req.body);

    try {
        await user.save();  //save to DB
        console.log(user);

        const accessToken = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET!);

        res.setHeader("Set-Cookie", `user=${accessToken}; Path=/`);   //send cookie to client

        res.send("User created");

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


//get all users
router.get("/users", async(req:Request, res:Response) => {
    try {
        const users = await User.find({});   //get all users

        res.send(users);
        
    } catch (err) {
        console.log(err);
    }
})


//get specific  user (sideBar.tsx >> client)
router.get("/user", async(req:Request, res:Response) => {
    const token = req.headers.authorization;
    // console.log({token});

    try {
        const data = jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!);
        // console.log({data});

        const user = await User.find({email: data?.email});

        res.send(user);

    } catch (err) {
        console.log(err);
    }
})


export default router;