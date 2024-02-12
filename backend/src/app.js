import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/projects.routes.js';
import degreeRoutes from './routes/degrees.routes.js';
import testRoutes from './routes/test.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', degreeRoutes);
app.use('/api', testRoutes);

export default app;