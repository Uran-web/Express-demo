import express from 'express';
import {
  getPostsHandler,
  postSinglePostHandler,
  deletePostHandler,
} from '../controllers/posts.ts';
import db from '../db/connection.ts';
import { isAuthenticated } from '../middlewares/isAuthenticated.ts';

const router = express.Router();

// connect data base
db();

router.get('/', isAuthenticated, getPostsHandler);
router.post('/', isAuthenticated, postSinglePostHandler);
router.delete('/:postId', isAuthenticated, deletePostHandler);

export default router;
