'use strict';
import express, { Router } from 'express';
const test = Router();

test.use('/', (req, res) => {
	res.json({
		status: 200,
		text: "API Opentani is working!"		
	})
});

export default test;

