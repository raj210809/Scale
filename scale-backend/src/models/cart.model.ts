import mongoose,{Schema , Document} from "mongoose";
import { ICartProduct , CartProductSchema } from "./cartProduct.model";

export interface ICart extends Document{
    user : mongoose.Types.ObjectId;
    products : ICartProduct[];
}

const CartSchema : Schema = new Schema<ICart>({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    products : [CartProductSchema]
})

export default mongoose.model<ICart>("Cart" , CartSchema)