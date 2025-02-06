import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './errors.middleware';
import { rateLimiter } from './rate_limiting.middleware';

const applyMiddleware = (app: express.Application) => {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use((helmet()));
    app.use(errorHandler);
    app.use(rateLimiter);
}

export default applyMiddleware;