import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {

    const token = req.header('Authorization');

    if(!token){
        res.status(401).json({error: 'Unauthorized'});
        return;
    }

    try{

        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
        if(typeof decoded !== 'object'){
            res.status(401).json({error: 'Unauthorized'});
            return;
        }
        req.role = decoded.role;
        req.userId = decoded.userId;
        next();

    }catch(e){
        res.status(401).json({error: 'Internal Server Error'});
    }

}

export function verifySeller(req: Request, res: Response, next: NextFunction) {

    const role = req.role;

    if(role !== 'seller'){
        res.status(401).json({error: 'Unauthorized'});
        return;
    }

    next();

}