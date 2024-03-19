import express from 'express';
import authRouter from './auth.ts';
import postsRouter from './posts.ts';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/posts', postsRouter);

export default router;
