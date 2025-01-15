import express from "express";
import { getPresignedUrls } from "src/controllers/product.controller";

const router = express.Router();

router.post("/get-presignedurls" , getPresignedUrls)

export default router;