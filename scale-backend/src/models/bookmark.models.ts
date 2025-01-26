import mongoose, { Schema, Document } from "mongoose";

export interface IBookmark extends Document {
    user : mongoose.Types.ObjectId;
    type : string;
    product : mongoose.Types.ObjectId;
    post : mongoose.Types.ObjectId;
}

const BookmarkSchema : Schema = new Schema<IBookmark>({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    type : {type : String},
    product : {type : mongoose.Schema.Types.ObjectId , ref : "Product"},
    post : {type : mongoose.Schema.Types.ObjectId , ref : "Post"}
})

export default mongoose.model<IBookmark>("Bookmark" , BookmarkSchema)