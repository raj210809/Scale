import express from 'express';
import { addToCart, getCart , removeFromCart } from '../controllers/cart.controller';


const router = express.Router();

router.post('/add-to-cart', addToCart);
router.get('/get-cart', getCart);
router.post('/remove-from-cart', removeFromCart);


export default router;