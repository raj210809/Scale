import e from "express";
import mongoose,{Schema , Document} from "mongoose";

export interface ICartProduct extends Document {
    product : mongoose.Types.ObjectId;
    quantity : number;
    size : string;
}

export const CartProductSchema : Schema = new Schema<ICartProduct>({
    product : {type : mongoose.Schema.Types.ObjectId , ref : "Product"},
    quantity : {type : Number},
    size : {type : String}
})