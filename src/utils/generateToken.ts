import jwt from 'jsonwebtoken';

// Import the 'dotenv' module
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const secret= process.env.SECRET || ''
const api_key = process.env.API_KEY || ''

export const generateToken = (user_id: string): string => {
    if (!api_key || !user_id) {
        throw new Error('Missing parameters');
    }

    // Generate token using JWT
    const token = jwt.sign({ user_id }, secret);

    return token;
};