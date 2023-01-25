import MongoStore from 'connect-mongo';
import express, { json, urlencoded, Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
require('dotenv').config();
import apiRouter from './api/api-index';
import connectToDatabase from './api/database';
import useLocalStrategy, { protect } from './middlewares/authentication';

const APP_PORT:Number = Number.parseInt(`${process.env.APP_PORT || 5000}`);
const APP_PROTOCOL:string = process.env.APP_PROTOCOL || 'http';
const APP_HOST:string = process.env.APP_HOST || 'localhost';
const COOKIE_SECRET:string = process.env.COOKIE_SECRET || 'mySecret';

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());
mongoose.set('strictQuery',true);
connectToDatabase();
const sessionStore = new MongoStore({
    client: mongoose.connection.getClient(),
    collectionName: 'sessions'
});
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60
    }
}));
useLocalStrategy();

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/', apiRouter);

app.get('/', protect(),(req: Request, res:Response)=> {
    res.send('<h1>App page</h1><p>Normally this page won\'t be visible till we were logged in');
})
app.get('/login',protect({allowIf: 'unauthenticated'}), (req: Request, res:Response)=> {
    res.send('<h1>Login page</h1><p>Enter your email and password to be logged in<form method="post" action="api/v1/users/login"><label for="email">Adresse email</label><input id="email" type="text" name="email"/><br/><label for="psswd">Mot de passe</label><input id="psswd" type="password" name="password"/><br/><input type="submit" value="Connexion"/></form>');
})
app.get('/register',protect({allowIf:'unauthenticated'}),(req: Request, res:Response)=> {
    res.send('<h1>Register page</h1><p>Here you should have your register page');
})
app.listen(APP_PORT, ()=>console.log(`Application is listening on adresse:\n${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`));