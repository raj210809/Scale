
import jwt from "jsonwebtoken";

export const verifyToken = (request: any, response: any, next: any)=>{
    const token = request.cookies.jwt;
    if(!token) return response.status(401).send("You are not authenticated");
    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) return response.status(500).send("JWT key is missing");
    jwt.verify(token, jwtKey, async(err :any, payload:any)=>{
        if(err) return response.status(403).send("Token is not valid!");
        if (payload) {
            if (typeof payload !== 'string' && 'userId' in payload) {
                request.userId = payload.userId;
            } else {
                return response.status(403).send("Token payload is invalid!");
            }
        } else {
            return response.status(403).send("Token payload is missing!");
        }
        next();
    })
}