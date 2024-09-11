import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import UserRouter from './routes/user.routes.js';

// Create Express App
const app = express();

// Load ENV Variables
dotenv.config();

// Load Middleware
app.use(express.json(), cors({ "credentials": true, "origin": "http://localhost:5173" }));

// Load Routes
app.use('/api/users', UserRouter);

// Serve Start
async function serverStart() {
    try {
        await dbConnect();
        const PORT = process.env.PORT;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

await serverStart();