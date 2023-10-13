import { Request, Response, Router } from "express";
import { User } from "../models/userModel";

const router = Router();

//authorization route
router.post("/auth", async(req:Request, res:Response) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send(user);
    } catch (error) {
        
    }
});


export default router;