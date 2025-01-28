import mongoose , {Schema , Document} from "mongoose";

export interface IEmployee extends Document {
    brand : mongoose.Types.ObjectId,
    name : string,
    email : string,
    phone : string,
    address : string,
    position : string,
    department : string,
    password : string,
    isAdmin : boolean
}

const EmployeeSchema : Schema = new Schema<IEmployee>({
    brand : {type : mongoose.Schema.ObjectId , ref : "Brand" , required : true},
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    phone : {type : String , required : true},
    address : {type : String , required : true},
    position : {type : String , required : true},
    department : {type : String , required : true},
    password : {type : String , required : true},
    isAdmin : {type : Boolean , default : false}
})