import { Request, Response } from 'express';
import  Cart  from '../models/cart.model';
import Product from '../models/product.model';
import { mongo } from 'mongoose';
import { ICartProduct } from 'src/models/cartProduct.model';

// Add product to cart
export const addToCart = async (req : Request, res : Response) : Promise<any> => {
  try {
    const { userId, productId, quantity , size } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // if (product.stock < quantity) {
    //   return res.status(400).json({ message: 'Insufficient stock' });
    // }

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity , size }],
      });
    } else {
      // Check if product already exists in cart
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        const cartItem : any = {
            product : productId,
            quantity : quantity,
            size : size
        }
        cart.products.push(cartItem);
      }
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getCart = async (req: Request, res: Response): Promise<any> => {
  try {
      const { userId } = req.query;

      // Find the cart for the given user and populate product details
      const cart = await Cart.findOne({ user: userId }).populate({
          path: 'products.product', // Path to the product reference
          model: 'Product', // The model to populate from
      });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json({ 
          message: 'Cart fetched successfully', 
          cart 
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
  }
};



// Remove product from cart
export const removeFromCart = async (req : Request, res : Response) : Promise<any> => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update product quantity in cart
export const updateCart = async (req : Request, res : Response) : Promise<any> => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Clear the cart
export const clearCart = async (req : Request, res : Response) : Promise<any> => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = [];
    await cart.save();
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
