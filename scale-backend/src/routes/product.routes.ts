import express from "express";
import { getPresignedUrls,writeReviews,addProducts,getProducts,viewProduct , getProductByIds , getProductByBrand  ,searchProducts } from "../controllers/product.controller";

const router = express.Router();

router.post("/get-presignedurls" , getPresignedUrls)
router.post("/add-products",addProducts)
router.get("/get-products",getProducts)
router.get("/get-product-by-ids",getProductByIds)
router.get("/get-product-by-brand",getProductByBrand)
router.get("/search" , searchProducts)
router.get("/view-product/:product_id",viewProduct)
router.post("/write-reviews", writeReviews)

export default router;
