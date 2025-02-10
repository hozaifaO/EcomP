import Router from "express";
import { cereateUserSchema, usersTable, loginUserSchema } from "../../db/userSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import bcrypt from 'bcrypt';
import { db } from "../../db";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(cereateUserSchema), async (req, res) => {
    try{
        const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 7);

    const [user] = await db.insert(usersTable).values(data).returning();
    user.password = "undefined";
    res.status(200).json({user});

    

    }catch(e){
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', validateData(loginUserSchema), async (req, res) => {
    try{
        const {email, password} = req.cleanBody;
        console.log("Passed getting email and password")
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        console.log(user);
        console.log("Passed getting user")
        if(!user){
            res.status(401).send('Login Please, user exists');
            return;
        }

        const matched = await bcrypt.compare(password, user.password);

        console.log("Passed matching passwords")

        if(!matched){
            res.status(400).send('Authentication Failed');
            return;
        }

        //Create JWT token later and send
        const token = jwt.sign({userId: user.id, role: user.role}, 'process.env.JWT_SECRET', {expiresIn: '12h'});

        console.log("Passed creating token")

        user.password = "undefined";

        res.status(200).json({token, user}); 

    }catch(e){
        console.log(e);
        res.status(500).send('Internal Server Error');
    }

});


export default router;
