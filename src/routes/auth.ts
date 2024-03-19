import express from 'express';
import {
  postSignInHandler,
  postSignUpHandler,
  postSignOutHandler,
} from '../controllers/auth.ts';

import { authenticate } from '../middlewares/authentificate.ts';
import { isAuthenticated } from '../middlewares/isAuthenticated.ts';

const router = express.Router();

router.post('/signin', authenticate, postSignInHandler);
router.post('/signup', postSignUpHandler);
router.get('/signout', isAuthenticated, postSignOutHandler);
router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

export default router;
