import { IStrategyOptions, IVerifyOptions, Strategy  as LocalStrategy, VerifyFunction, } from 'passport-local';
import { isValidEmail, isValidPassword } from '../utils';
import UserModel, { IUser } from '../api/models/user';
import {compare} from 'bcrypt';
import { DoneFunction, IProtectOptions } from '../types';
import passport from 'passport';
import { isValidObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

const customFields:IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password'
};



const verifyCallback:VerifyFunction = async(username: string, password:string, done:DoneFunction)=> {
    try {
        if(isValidEmail(username) && isValidPassword(password)) {
            const foundUser:IUser = await UserModel.findOne({email: username}).lean();
            if(foundUser && foundUser.password && await compare(password,foundUser.password)) {
                delete foundUser.password;
                return done(null, foundUser);
            }
            else return done(null, false);
        }
        else new Error("Email et/ou mot de passe invalide"); 
    } catch (inException:any) {
        return done(inException);
    }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

export default function useLocalStrategy() {
    passport.use(strategy);
    passport.serializeUser(async(user:any, done:DoneFunction)=> {
        done(null, user._id);
    });
    
    passport.deserializeUser(async(userId:string, done:DoneFunction)=> {
        if(isValidObjectId(userId)) {
            try {
                const foundUser:IUser = await UserModel.findById(userId).lean();
                if(foundUser._id) {
                    return done(null, foundUser);
                }
                else return done(null, false);
            } catch (inException:any) {
                return done(inException);
            }
        }
    });
}




export const protect = (inOptions:IProtectOptions = {allowIf: 'authenticated'})=> {
    return function(req:Request, res:Response, next:NextFunction) {
        //console.log(`${req.originalUrl} is allowed only ${ "if the user is " + inOptions.allowIf}`);
        if((req.isAuthenticated() && inOptions.allowIf === 'authenticated') || (req.isUnauthenticated() && inOptions.allowIf === 'unauthenticated')) {
            //console.log('auth means: allowed');
            if(inOptions.orRedirectTo && inOptions.orRedirectTo != "") {
                //console.log(`and the user is redirected to ${inOptions.orRedirectTo}`);
                return res.redirect(inOptions.orRedirectTo);
            }
            else if(inOptions.orSendError) {
                //console.log(`and the server send an error message`);
                return res.status(401).json({err: inOptions.orSendError});
            }
            else {
                //console.log('next();')
                return next();
            }
            
        }
        else if((req.isAuthenticated() && inOptions.allowIf === 'unauthenticated') || (req.isUnauthenticated() && inOptions.allowIf === 'authenticated')) {
            //console.log('auth means: restricted');
            if(inOptions.orRedirectTo && inOptions.orRedirectTo != "") {
                //console.log(`and the user is redirected to ${inOptions.orRedirectTo}`);
                return res.redirect(inOptions.orRedirectTo);
            }
            else if(inOptions.orSendError) {
                //console.log(`and the server send an error message`);
                return res.status(401).json({err: inOptions.orSendError});
            }
            else {
                //console.log(`and the user is redirected to the ^{(inOptions.allowIf === 'unauthenticated') ? '/' : '/login'} page`);
                return res.redirect((inOptions.allowIf === 'unauthenticated') ? '/' : '/login');
            }
        }
    }
}