import express from 'express';
import { APP } from './core';
import cors from 'cors';
import morgan from 'morgan';
import { auth_router, note_router } from './routes';
import { error_handler } from './midlewares/error_handler';
import { auth } from './midlewares/auth';

const app = express();

// variables
app.set('PORT', APP.PORT);

//midlewars
app.use(express.json());
app.use(cors({ origin : "*" }));
app.use(morgan('dev'));
app.use(error_handler);

// routes
app.use('/api/v1/auth', auth_router);
app.use('/api/v1/notes', auth ,note_router);

export { app };