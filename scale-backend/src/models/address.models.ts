import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
    user : mongoose.Types.ObjectId;
    name : string;
    mobile : string;
    pincode : string;
    address : string;
    locality : string;
    city : string;
    state : string;
    address_type : string;
}

const AddressSchema : Schema = new Schema<IAddress>({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    name : {type : String},
    mobile : {type : String},
    pincode : {type : String},
    address : {type : String},
    locality : {type : String},
    city : {type : String},
    state : {type : String},
    address_type : {type : String}
})

export default mongoose.model<IAddress>("Address" , AddressSchema)