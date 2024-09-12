import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';

// Load environment variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// JWT generator
function generateToken(id) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
}

// Login errors object
const errors = {
    credentials: {
        message: 'Invalid credentials',
        status: 400
    },
}

const UserController = {
    "register": async (req, res) => {
        try {
            const newUser = await UserModel.create(req.body);
            const userToken = generateToken(newUser._id);
            return res.status(201).json({
                token: userToken,
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email

            })
        } catch (error) {
            console.log(error);
            res.status(422).json(error);
        }
    },

    "login": async (req, res) => {
        try {
            const user = await UserModel.findOne({ "email": req.body.email });

            if (!user) {
                console.log('Invalid credentials');
                return res.status(400).json({ errors });
            }

            const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);

            if (!isCorrectPassword) {
                return res.status(400).json({ errors });
            }

            const userToken = generateToken(user._id);
            return res.status(200).json({
                token: userToken,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email

            })
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    "getAll": async (req, res) => {
        try {
            const allUsers = await UserModel.find()
            res.status(200).json(allUsers);
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
}
export default UserController;