import { Request, Response } from 'express';
import Message from '../models/message.model';

export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, otherUserId } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId }
            ]
        })
        .sort({ timestamp: 1 })
        .populate('sender', 'username profileImage')
        .populate('product')
        .populate('post');

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
        const { messageId } = req.params;
        await Message.findByIdAndUpdate(messageId, { read: true });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
