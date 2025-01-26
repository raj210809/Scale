import express from "express";
// import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
// import passport from "./config/passport";
// import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.routes";
import connectDB from "./config/db";
import updateRoutes from "../src/routes/updates.routes";
import addressRoutes from "./routes/address.routes"
import cartRoutes from "./routes/cart.routes"
import bookmarkRoutes from "./routes/bookmark.routes"
import { orderProcessing } from "./controllers/orderProcess.controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: "*", // Replace with your client's domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Initialize Passport
// app.use(passport.initialize());

// Connect to MongoDB
connectDB();

// Routes
// app.use("/auth", authRoutes);
app.use("/products" , productRoutes)
app.use("/updates" , updateRoutes)
app.use("/address", addressRoutes)
app.use("/cart", cartRoutes)
app.use("/bookmark", bookmarkRoutes)
app.post("/orderProcessing" , orderProcessing)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
