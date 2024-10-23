import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoose.config.js';
import helmet from 'helmet';
import morgan from 'morgan';
import songRouter from './routes/song.routes.js';
import playlistRouter from './routes/playlist.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api', songRouter);
app.use('/api', playlistRouter);

app.listen(PORT, () => {
    console.log(`¡Escuchando en el puerto: ${PORT}!`);
});