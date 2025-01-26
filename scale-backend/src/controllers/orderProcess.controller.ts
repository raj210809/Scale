import express, { Request, Response } from "express";
import YourOrder from "../models/yourorder.model";
import Product from "../models/product.model";
import BrandOrder from "../models/brandOrder.model";

interface ProductInterface {
  id: string;
  quantity: number;
  size: string;
}

export const orderProcessing = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const products: ProductInterface[] = data.data.cartContent.products;
    const payment = data.data.cartContent.payment;
    const address = data.data.address;
    const paymentMode = data.paymentMode; // Not used but retained for future
    const user = data.data.user;


    // Process individual orders
    for (const product of products) {
      const newOrder = new YourOrder({
        user,
        product: product.id,
        quantity: product.quantity,
        size: product.size,
        payment,
        status: "Processing",
        orderOn: new Date(),
        statusComment: "Your order is being processed",
        address,
      });
      await newOrder.save();
    }

    // Group products by brand
    const brandGroupedProducts = new Map<string, any[]>();

    for (const product of products) {
      const productDetails = await Product.findById(product.id);

      if (!productDetails || !productDetails.brand) {
        console.warn(`Product with ID ${product.id} is missing brand or details.`);
        continue; // Skip products without valid details
      }

      const brand: string = productDetails.brand;

      if (!brandGroupedProducts.has(brand)) {
        brandGroupedProducts.set(brand, []);
      }

      brandGroupedProducts.get(brand)?.push({
        product: product.id,
        quantity: product.quantity,
        price: productDetails.price || 0, // Default price to 0 if undefined
      });
    }

    // Create brand-specific orders
    for (const [brand, orderItems] of brandGroupedProducts.entries()) {
      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      const newBrandOrder = new BrandOrder({
        brand,
        address,
        orderOn: new Date(),
        orderItems,
        totalAmount,
      });

      await newBrandOrder.save();
    }

    res.status(200).json({ message: "Order processed successfully." });
  } catch (error) {
    console.error("Error during order processing:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
