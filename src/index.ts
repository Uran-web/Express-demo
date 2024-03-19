import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import './loadEnvironments';
import routes from './routes/index.ts';

const PORT = process.env.PORT || 3000;
const BASE_URL = `${process.env.BASE_URL}:${PORT}`;

const app: Express = express();

app.use(
  session({
    secret: process.env.SECRETE_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const server = app.listen(PORT, () => {
  `Server is running on: ${BASE_URL}:${PORT}`;
});

export { app, server };
