import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  inventory : string;
  restock_date : string;
  itemsold :string;
  avg_delivery_day : string;
  item_returned : string;
  images: string[];
  colorAvailable: string[];
  name: string;
  rating: number;
  numberOfRating : number;
  brand: string;
  brief: string;
  sizeAvailable: string[];
  price: string;
  features: string;
  Caring_info : string;
  Shipping_info : string;
  Additional_info : string;
  reviews: mongoose.Types.ObjectId[];
  draft : boolean;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    inventory : { type: String , default : "0"},
    restock_date : { type: String },
    itemsold : { type: String , default : "0"},
    avg_delivery_day : { type: String },
    item_returned : { type: String , default : "0"},
    images: [{ type: String, required: true }],
    colorAvailable: [{ type: String }],
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numberOfRating : { type: Number, default: 0 },
    brand: { type: String },
    brief: { type: String },
    sizeAvailable: [{ type: String }],
    price: { type: String, required: true },
    features: [{ type: String }],
    Caring_info : { type: String },
    Shipping_info : { type: String },
    Additional_info : { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    draft : { type : Boolean }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
