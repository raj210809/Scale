import mongoose, { Document, Schema, Types } from 'mongoose';

export type MessageType = 'text' | 'product' | 'post';

export interface IMessage extends Document {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    content?: string;
    product?: Types.ObjectId;
    post?: Types.ObjectId;
    type: MessageType;
    timestamp: Date;
    read: boolean;
}

const MessageSchema: Schema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    type: { type: String, enum: ['text', 'product', 'post'], required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

export default mongoose.model<IMessage>('Message', MessageSchema);
