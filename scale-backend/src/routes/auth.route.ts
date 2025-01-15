import express from "express";
import { signup, login, forgotPassword, resetPassword } from "../controllers/auth.controller";
import passport from "passport";
import { getAuthorizationUrl, exchangeCodeForTokens, verifyIdToken } from '../config/appleOAuth';
import crypto from 'crypto';

const router = express.Router();

// Normal Authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  res.redirect("/dashboard"); // dashboard pe bhej diya baki tu dekh liyo
});

// Facebook OAuth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req, res) => {
  res.redirect("/dashboard"); 
});

// Apple Login Initiation
router.get('/apple', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  const nonce = crypto.randomBytes(16).toString('hex');

  const redirectUri = `${req.protocol}://${req.get('host')}/auth/apple/callback`;
  const url = getAuthorizationUrl(redirectUri, state, nonce);

  res.redirect(url);
});

// Apple Callback
router.post('/apple/callback', async (req, res) => {
  try {
    const { code, id_token } = req.body;

    // Exchange the authorization code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Verify the ID token
    const userInfo = verifyIdToken(tokens.id_token);

    // Use userInfo (e.g., sub, email) to find or create a user in your database
    res.json({ user: userInfo, tokens });
  }catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
});

export default router;
