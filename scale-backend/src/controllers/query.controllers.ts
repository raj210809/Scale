import {Request, Response} from 'express';
import Query from '../models/query.models';

export const postQuery = async (req: Request, res: Response) => {
    const {productName, productId, query, brand} = req.body;
    console.log(req.body);
    try {
        const newQuery = new Query({
            productName,
            productId,
            query,
            brand
        });
        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export const getQuery = async (req: Request, res: Response) => {
    const brand = req.query.brand;
    try {
        const queries = await Query.find({brand , hasAnswerd : false});
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export const postAnswer = async (req: Request, res: Response) => {
    const {id, answer , visibility} = req.body;
    try {
        const query = await Query.findById(id);
        if (query) {
            query.answer = answer;
            query.hasAnswerd = true;
            query.visibility = visibility;
            await query.save();
            res.status(200).json(query);
        }
        res.status(404).json({message: "Query not found"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}