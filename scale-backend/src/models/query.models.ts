import mongoose,{Schema , Document} from "mongoose";

export interface IQuery extends Document {
    productName : string,
    productId : mongoose.Types.ObjectId,
    query : string,
    answer : string,
    brand : string,
    hasAnswerd : boolean,
    visibility : string
}

const QuerySchema : Schema = new Schema<IQuery>({
    productName : {type : String , required : true},
    productId : {type : mongoose.Schema.ObjectId, ref : "Product" , required : true},
    query : {type : String , required : true},
    answer : {type : String},
    brand : {type : String , required : true},
    hasAnswerd : {type : Boolean , default : false},
    visibility : {type : String}
})

export default mongoose.model<IQuery>("Query" , QuerySchema);