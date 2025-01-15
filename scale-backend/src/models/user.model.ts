import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  termsAccepted: boolean;
  notificationPermission: boolean;
  yourOrders: mongoose.Types.ObjectId[];
  mainImage: string;
  coverImage: string;
  googleId?: string;
  facebookId?: string;
  appleId?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    termsAccepted: { type: Boolean, required: true },
    notificationPermission: { type: Boolean, default: true },
    yourOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    mainImage: { type: String },
    coverImage: { type: String },
    googleId: { type: String, unique: true },
    facebookId: { type: String, unique: true },
    appleId: { type: String, unique: true },

    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
