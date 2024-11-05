import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/mongoose.config.js';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from './src/routes/users.routes.js';
import cookieParser from 'cookie-parser';
import loginRouter from './src/routes/login.routes.js';
import { validationSchema } from './src/middlewares/validationSchema.middleware.js';
import songRouter from './src/routes/song.routes.js';
import playlistRouter from './src/routes/playlist.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

app.use(cookieParser());

app.use(validationSchema);

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api/', userRouter);
app.use('/api/', loginRouter);
app.use('/api/', songRouter);
app.use('/api/', playlistRouter);


app.listen(PORT, () => {
    console.log(`¡Escuchando en el puerto: ${PORT}!`);
});