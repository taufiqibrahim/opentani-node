'use strict';

import express, { Router } from 'express';
import test from './test';
import signup from './signup';
import login from './login';

const Main = Router();
Main.get('/test', test);
Main.post('/signup', signup);
Main.post('/login', login);

export default Main;