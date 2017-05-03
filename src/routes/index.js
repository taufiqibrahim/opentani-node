'use strict';

import express, { Router } from 'express';
import Main from './main';

const router = Router();
router.use('/', Main);

export default router;