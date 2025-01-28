import { Server as SocketIOServer } from "socket.io";
import Message from './models/message.model';

const setupSocket = (server: any) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket: any) => {
        console.log('User disconnected', socket.id);
        for (const [userId, socketId] of userSocketMap) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage = async (message: any) => {
        try {
            const { sender, receiver, type } = message;
            const senderSocketId = userSocketMap.get(sender);
            const receiverSocketId = userSocketMap.get(receiver);
            let messageData;

            if (type === 'text') {
                const newMessage = new Message({
                    sender: sender,
                    receiver: receiver,
                    content: message.content,
                    timestamp: new Date(),
                    read: false
                });
                await newMessage.save();
                messageData = await Message.findById(newMessage._id);
            } else if (type === 'product') {
                const newMessage = new Message({
                    sender: sender,
                    receiver: receiver,
                    product: message.product,
                    type: 'product',
                    timestamp: new Date(),
                    read: false
                });
                await newMessage.save();
                messageData = await Message.findById(newMessage._id).populate('product', 'id images name brand brief rating price reviews');
            } else if (type === 'post') {
                const newMessage = new Message({
                    sender: sender,
                    receiver: receiver,
                    post: message.post,
                    type: 'post',
                    timestamp: new Date(),
                    read: false
                });
                await newMessage.save();
                messageData = await Message.findById(newMessage._id).populate('post', 'id name profileDescription profileImage uploadedItems captions likesCount commentCount sharesCount');
            }

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', messageData);
            }
            if (senderSocketId) {
                io.to(senderSocketId).emit('receiveMessage', messageData);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log('User connected', userId, 'with socket', socket.id);
        } else {
            console.log('UserId not found in socket connection');
        }

        socket.on('sendMessage', (message) => {
            console.log("Received message", message);
            sendMessage(message);
        });

        socket.on('disconnect', () => disconnect(socket));
    });
};

export default setupSocket;
