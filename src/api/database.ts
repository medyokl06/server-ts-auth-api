import mongoose, { createConnection, Connection, connect, CallbackWithoutResult } from "mongoose";
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

const DB_HOST:string = process.env.DB_URI || '127.0.0.1';
const DB_PORT:Number = Number.parseInt(`${process.env.DB_PORT || 27017}`);
const DB_NAME:string = process.env.DB_NAME || 'test_db';
const DB_URI: string = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default function(){connect(DB_URI)};
