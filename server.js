import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import subscribersRoutes from './routes/subscriber.js';

const PORT = 3000;
dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error.message));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use('/subscribers', subscribersRoutes);

app.listen(PORT, () => console.log('Server is listening'));
