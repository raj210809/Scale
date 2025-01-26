import AWS from "aws-sdk"
import express, {Response , Request} from "express"
import Review from "../models/review.model";
import Product from "../models/product.model";
import mongoose from "mongoose";
import { getPaginatedReviews } from "../Pagination";



export const getPresignedUrls = async (req : Request, res : Response) : Promise<any> => {
    const S3 = new AWS.S3({
        accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
        secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
        region : "ap-south-1"
    })
    const { fileTypes } = req.body;

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
                Expires: 60 * 10,
                ContentType: fileType,
            };

            const presignedUrl = await S3.getSignedUrlPromise("putObject", s3Params);

            urls.push({ presignedUrl, key });
        }

        res.status(200).json({ urls });
    } catch (error) {
        console.error("Error generating pre-signed URLs:", error);
        res.status(500).json({ message: "Failed to generate pre-signed URLs" });
    }
};

export const addProducts = async (req : Request, res : Response) : Promise<any> => {

    const {products} = req.body;
    products.forEach(async (product : any) => {
    try {
        const products = await Product.create(product);
        await products.save();
        res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        console.log(error);
    }
},); }

export const getProducts = async (req : Request, res : Response) : Promise<any> => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
    }
}
export const getProductByIds = async (req: Request, res: Response): Promise<any> => {
    const { ids } = req.query;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Invalid or missing "ids" in the request body.' });
    }

    try {
        // Fetch products by IDs
        const products = await Product.find({ _id: { $in: ids } });

        // Check if any products are found
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the provided IDs.' });
        }

        // Send response with products
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'An error occurred while fetching products.' });
    }
};

export const getProductByBrand = async (req: Request, res: Response) : Promise<any> => {
    const { brand } = req.query;
    if (!brand) {
        return res.status(400).json({ message: 'Invalid or missing "brand" in the request body.' });
    }

    try {
        // Fetch products by brand
        const products = await Product.find({ brand });

        // Check if any products are found
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the provided brand.' });
        }

        // Send response with products
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'An error occurred while fetching products.' });
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
    const { name,product_id,images,rating,comments,date } = req.body; 
    
    if(!name || !product_id || !rating || !comments){
        return res.status(400).json({ message: "Invalid data" });
    }
    try {
        const review = await Review.create({ 
            name:name,
            product:product_id,
            images:images,
            rating:rating,
            comments:comments,
        });

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

const getReview = async (req: Request, res: Response) : Promise<any> => {
    const ids = req.query.ids as string;
    if (!ids) {
        return res.status(400).json({ message: 'Invalid or missing "ids" in the request body.' });
    }
    try {
        const reviews = await Review.find({ _id: { $in: ids } });
        res.status(200).json({ reviews });
    } catch (error) {
        console.log(error);
    }
}