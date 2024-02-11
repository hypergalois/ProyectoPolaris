import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export function createAccessToken(payload) {

    console.log(secret);
    console.log(payload);

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: 86400 }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    })
}