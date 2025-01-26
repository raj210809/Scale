import {Request , Response} from "express";
import Bookmark from "../models/bookmark.models";

export const addBookmark = async (req : Request , res : Response) => {
    try {
        const { user, id , type } = req.body;

        if(type === "product"){
        const newBookmark = new Bookmark({
            user,
            product : id,
            type
        })
            await newBookmark.save()
        }else{
            const newBookmark = new Bookmark({
                user,
                post : id,
                type
            })
            await newBookmark.save()
        }

        res.status(200).json({ message: "Bookmark added successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const getBookmarks = async (req : Request , res : Response) : Promise<any> => {
    const { user } = req.query;
    try {
        const bookmarks = await Bookmark.find({user : user});
        res.status(200).json({ bookmarks });
    } catch (error) {
        console.log(error);
    }
}

export const removeBookmark = async (req : Request , res : Response) : Promise<any> => {
    const { user ,type , id } = req.body;
    try {
        await Bookmark.findOneAndDelete({user : user , type : type , product : id});
        res.status(200).json({ message: "Bookmark removed successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const hasBookmarked = async (req : Request , res : Response) : Promise<any> => {
    const { user , type , id } = req.query;
    try {
        const bookmark = await Bookmark.findOne({user : user , type : type , product : id});
        if(bookmark){
            res.status(200).json({ bookmark : true });
        }else{
            res.status(200).json({ bookmark : false });
        }
    } catch (error) {
        console.log(error);
    }
}