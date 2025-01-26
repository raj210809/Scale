import mongoose,{Schema , Document} from "mongoose";

interface orderItems {
    product : mongoose.Types.ObjectId;
    quantity : number;
    price : number;
}

interface IOrderBrand extends Document {
    brand : string;
    address : mongoose.Types.ObjectId;
    status : string;
    orderOn : Date;
    orderItems : orderItems[];
    totalAmount : number;
}

const BrandOrderSchema : Schema = new Schema<IOrderBrand>({
    brand : { type : String , required : true },
    address : { type : mongoose.Schema.Types.ObjectId , ref : "Address" , required : true },
    status : { type : String , default : "Processing" }, 
    orderOn : { type : Date , required : true },
    orderItems : [{ type : Object , required : true }],
    totalAmount : { type : Number , required : true }
},{ timestamps : true });

export default mongoose.model<IOrderBrand>("BrandOrder",BrandOrderSchema);