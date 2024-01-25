import express from "express";
import { config } from 'dotenv';
import mongoose from "mongoose";
import usersRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import cors from "cors";

const app = express();
app.use(cors());
config();
console.log(process.env.MONGO)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Mongo ON');
    } catch (error) {
        throw (error);
    }
};

// middlewares
app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT, () => {
    console.log('Server ON');
    connect();
});