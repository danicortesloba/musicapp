import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoose.config.js';
import helmet from 'helmet';
import morgan from 'morgan';
import songRouter from './routes/song.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import userRouter from './routes/user.routes.js';
import extractValidationErrors from './utils/validationUtils.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));



app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        err.statusCode = 400; 
        const normalizedError = {
            statusCode: err.statusCode,
            message: err.message || 'Ocurrió un error de validación',
            name: err.name || 'Error de validación',
            validationErrors: extractValidationErrors(err),
        };
        res.status(normalizedError.statusCode).json(normalizedError);
    } else {
        next(err); 
    }
});

const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api', songRouter);
app.use('/api', playlistRouter);
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`¡Escuchando en el puerto: ${PORT}!`);
});