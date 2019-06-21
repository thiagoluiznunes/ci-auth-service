import express from 'express';
import signup from './signup.action';
import login from './login.action';
import forgot from './forgot.action';

const router = new express.Router();
router.post('/login', login);
router.post('/signup', signup);
router.post('/forgot-password', forgot);

export default router;
