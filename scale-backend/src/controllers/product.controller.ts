import AWS from "aws-sdk"
import express, {Response , Request} from "express"
import Review from "../models/review.model";
import Product from "../models/product.model";
import mongoose from "mongoose";
import { getPaginatedReviews } from "../Pagination";

const s3 = new AWS.S3({
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
    secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
    region : "ap-south-1"
})

export const getPresignedUrls = async (req : Request, res : Response) : Promise<any> => {
    const { fileTypes } = req.body; // Expecting an array of file types

    if (!Array.isArray(fileTypes) || fileTypes.length === 0) {
        return res.status(400).json({ message: "Invalid fileTypes format" });
    }

    const urls = [];

    try {
        for (const fileType of fileTypes) {
            const key = `products/${Date.now()}-${Math.random()
                .toString(36)
                .substring(7)}`;
            
            const s3Params = {
                Bucket: "econsappbucket", // Replace with your bucket name
                Key: key,
                Expires: 60 * 10, // URL expiry time in seconds
                ContentType: fileType,
                ACL: "public-read",
            };

            const presignedUrl = await s3.getSignedUrlPromise("putObject", s3Params);

            urls.push({ presignedUrl, key });
        }

        res.status(200).json({ urls });
    } catch (error) {
        console.error("Error generating pre-signed URLs:", error);
        res.status(500).json({ message: "Failed to generate pre-signed URLs" });
    }
};

export const addProducts = async (req : Request, res : Response) : Promise<any> => {
    try {
        const products = await Product.create(req.body);
        await products.save();
        res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        console.log(error);
    }
} 

export const getProducts = async (req : Request, res : Response) : Promise<any> => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
    }
}

export const viewProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = req.params.product_id;
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 3;
  
      // Fetch the product details
      const product = await Product.findById(productId);
  
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
  
      // Fetch the paginated reviews
      const paginatedReviews = await getPaginatedReviews(productId, page, pageSize);
  
      res.status(200).json({
        product,
        paginatedReviews,
      });
    } catch (error) {
      console.error("Error in viewProduct:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const writeReviews = async (req : Request, res : Response) : Promise<any> => {
    const { user_id,product_id,images,rating,comments,date } = req.body; 
    
    if(!user_id || !product_id || !rating || !comments || !date){
        return res.status(400).json({ message: "Invalid data" });
    }
    try {
        const review = await Review.create({ 
            user:user_id,
            product:product_id,
            images:images,
            rating:rating,
            comments:comments,
            date:date });

        await review.save();

        res.status(200).json({ message: "Review added successfully" });

        await Product.findByIdAndUpdate(
            product_id,
            { $push: { reviews: review._id } },
            { new: true, useFindAndModify: false } 
          );
          console.log("Review added to successfully.");

    } catch (error) {
        console.log(error);
    }
}
