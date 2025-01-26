import mongoose , { Schema, Document } from "mongoose";

interface Payment {
    totalMRP: number;
    discount: number;
    shippingFee: number;
    totalAmount: number;
}

export interface IYourOrder extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  size : string;
  payment: Payment;
  status: string;
  orderOn : Date;
  statusComment: string
  address: mongoose.Types.ObjectId;
}

const YourOrderSchema: Schema = new Schema<IYourOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    size : { type: String },
    payment: { type: Object, required: true },
    status: { type: String, required: true },
    orderOn : { type: Date, required: true },
    statusComment: { type: String },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  },
  { timestamps: true }
);

export default mongoose.model<IYourOrder>("YourOrder", YourOrderSchema);