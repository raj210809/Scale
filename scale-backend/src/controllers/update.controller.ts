import express, { Request, Response } from "express"
import updateModel from "../models/update.model"
import { assign } from "nodemailer/lib/shared"

export const postUpdate = async (req : Request , res : Response) : Promise<any> =>{
    const {images , heading , description , brand , productTagged , draft } = req.body

    try {
        const update =new updateModel({
            images , heading , description , brand , draft
        })
    
        await update.save()
        res.status(200).json({message : "created successfully"})
    } catch (error) {
        res.status(500).json({error : error})
    }
}

export const getupdates = async (req : Request , res : Response) : Promise<any> =>{
    const {brand , draft} = req.query

    try {
        const updates = await updateModel.find({brand : brand , draft : draft})
        res.status(200).json(updates)
    } catch (error) {
        res.status(500).json({error : error})
    }
}