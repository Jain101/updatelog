import jwt, { Secret } from 'jsonwebtoken';
import express from 'express';
// import { next, req, res } from '../definitions';
// import { Request } from 'express';

export const createJWT = (user: any) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username,
    },
        process.env.JWT_SECRET as Secret);
    return token;
}

export const protect = (req: any, res: any, next: any) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.send("Not authorized");
        return;
    }
    const [, token] = bearer.split(' ');
    console.log(token);
    console.log(process.env.JWT_SECRET);
    if (!token) {
        res.status(401);
        res.send("No token provided");
        return;
    }
    // interface CustomRequest extends Request {
    //     user?: any;
    // }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);
        req.user = payload;
        // console.log(payload);
        next();
    } catch (error) {
        res.status(401)
        // console.log(error)
        res.send("Invalid token");
        return
    }
}