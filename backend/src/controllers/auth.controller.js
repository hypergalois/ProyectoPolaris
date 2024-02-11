import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createAccessToken } from '../libs/jwt.js';

import { PrismaClient } from '@prisma/client';

const secret = process.env.JWT_SECRET;

const prisma = new PrismaClient();

export const register = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    console.log(username, email, password)

    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (foundUser) return res.status(400).json({ message: "The email is already in use. Please log in instead." })

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                passwordHash: hashedPassword
            }
        });

        console.log(newUser)

        const accessToken = await createAccessToken({ id: newUser.id });

        res.cookie("token" , accessToken, {
            sameSite: "none",
            secure: true,
        });

        return res.json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        
        if (!foundUser) return res.status(400).json({ message: "There doesn't exist an user with that email. Try registering instead." });

        const passwordsMatch = await bcrypt.compare(password, foundUser.passwordHash);

        if (!passwordsMatch) return res.status(400).json({ message: "The password is incorrect. Try again." });

        const accessToken = await createAccessToken({ id: foundUser.id });

        res.cookie("token", accessToken, {
            sameSite: "none",
            secure: true,
        });

        return res.json({
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });

    return res.status(200).json({ message: "Logged out successfully." });
}

export const profile = async (req, res) => {
    const userFound = await prisma.user.findUnique({
        where: {
            id: req.userId
        }
    });

    if (!userFound) return res.status(404).json({ message: "User not found." });

    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No token provided." });

    jwt.verify(token, secret, async (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token." });

        const userFound = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });

        if (!userFound) return res.status(404).json({ message: "User not found." });

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    })
}

// I don't know to what extent this is necessary
export const refreshToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No token provided." });

    jwt.verify(token, secret, async (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token." });

        const userFound = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });

        if (!userFound) return res.status(404).json({ message: "User not found." });

        const accessToken = await createAccessToken({ id: userFound.id });

        res.cookie("token", accessToken, {
            sameSite: "none",
            secure: true
        });

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    })
}