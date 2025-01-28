import mongoose , {Schema , Document} from "mongoose";

export interface ISeller extends Document {
    companyName : string,
    companyEmail : string,
    companyPhone : string,
    companyAddress : string,
    website : string,
    registrationNumber : string,
    industryType : string,
    documents : string[],
    fullName : string,
    designation : string,
    email : string,
    phone : string,
    termaAccepted : boolean,
    accountInfo : {
        accountNumber : string,
        accountHolderName : string,
        bankName : string,
        accountType : string,
        routingNumber : string,
        swiftCode : string,
        taxID : string,
    }
}

const SellerSchema : Schema = new Schema<ISeller>({
    companyName : {type : String , required : true , unique : true},
    companyEmail : {type : String , required : true},
    companyPhone : {type : String , required : true},
    companyAddress : {type : String , required : true},
    website : {type : String , required : true},
    registrationNumber : {type : String , required : true},
    industryType : {type : String , required : true},
    documents : [{type : String}],
    fullName : {type : String , required : true},
    designation : {type : String , required : true},
    email : {type : String , required : true},
    phone : {type : String , required : true},
    termaAccepted : {type : Boolean , required : true},
    accountInfo : {
        accountNumber : {type : String , required : true},
        accountHolderName : {type : String , required : true},
        bankName : {type : String , required : true},
        accountType : {type : String , required : true},
        routingNumber : {type : String , required : true},
        swiftCode : {type : String , required : true},
        taxID : {type : String , required : true},
    }
})

export default mongoose.model<ISeller>("Seller" , SellerSchema);