import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  images: string[];
  colorAvailable: string[];
  name: string;
  rating: number;
  brand: string;
  description: string;
  sizeAvailable: string[];
  price: number;
  features: string[];
  reviews: mongoose.Types.ObjectId[];
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    images: [{ type: String, required: true }],
    colorAvailable: [{ type: String }],
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    brand: { type: String },
    description: { type: String },
    sizeAvailable: [{ type: String }],
    price: { type: Number, required: true },
    features: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
