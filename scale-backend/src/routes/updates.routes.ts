import express from "express"
import { postUpdate , getupdates } from "../controllers/update.controller"

const router = express.Router()

router.post("/postupdate" , postUpdate)
router.get("/getupdates" , getupdates)

export default router