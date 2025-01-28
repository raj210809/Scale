import express from 'express';
import { postQuery , getQuery , postAnswer } from '../controllers/query.controllers';

const router = express.Router();

router.post('/postQuery', postQuery);
router.get('/getQuery', getQuery);
router.post('/postAnswer', postAnswer);

export default router;