import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  profileImage: string;
  name: string;
  profileDescription: string;
  uploadedItems: string[];
  captions: string;
  likesCount: number;
  commentCount: number;
  sharesCount: number;
  products: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema<IPost>(
  {
    profileImage: { type: String },
    name: { type: String, required: true },
    profileDescription: { type: String },
    uploadedItems: [{ type: String }],
    captions: { type: String },
    likesCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
