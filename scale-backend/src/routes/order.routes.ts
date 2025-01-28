import express from "express";
import { orderProcessing , getOrders , getBrandOrder , getOrderById } from "../controllers/orderProcess.controller";

const router = express.Router();

router.post("/orderProcessing", orderProcessing);
router.get("/get-orders" , getOrders)
router.get("/get-brand-orders" , getBrandOrder)
router.get("/get-order-by-id" , getOrderById)

export default router