import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  images: string[];
  rating: number;
  comments: string;
  date: Date;
  profileImage: string;
}

const ReviewSchema: Schema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    images: [{ type: String }],
    rating: { type: Number, required: true },
    comments: { type: String },
    date: { type: Date, default: Date.now },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", ReviewSchema);
