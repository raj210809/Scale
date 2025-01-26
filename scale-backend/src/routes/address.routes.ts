import express from "express";
import {addAddress , getAddresses} from "../controllers/addrerss.controller"


const router = express.Router();

router.post("/add-address" , addAddress)
router.get("/get-addresses" , getAddresses)

export default router;