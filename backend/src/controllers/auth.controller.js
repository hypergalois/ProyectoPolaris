import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createAccessToken} from '../libs/jwt';

const secret = process.env.JWT_SECRET;

export const register = async (req, res) => {

}

export const login = async (req, res) => {
}

export const logout = async (req, res) => {}

export const profile = async (req, res) => {}

export const verifyToken = async (req, res) => {}

export const refreshToken = async (req, res) => {}