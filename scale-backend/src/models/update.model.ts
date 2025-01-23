import mongoose, { Schema, Document } from "mongoose";

export interface Updates extends Document {
    images : string[];
    heading : string;
    description : string;
    brand : string;
    draft : boolean
}

const UpdateSchema : Schema = new Schema<Updates>({
    images : [{type : String}],
    heading : {type : String},
    description : {type : String},
    brand : {type : String},
    draft : {type : Boolean}
},
    {timestamps : true}
)

export default mongoose.model<Updates>("Updates" , UpdateSchema)

