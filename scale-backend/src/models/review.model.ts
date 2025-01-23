import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  images: string[];
  rating: number;
  comments: string;
  date: Date;
  profileImage: string;
}

const ReviewSchema: Schema = new Schema<IReview>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    images: [{ type: String }],
    rating: { type: Number, required: true },
    comments: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", ReviewSchema);
