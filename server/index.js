import dotenv from "dotenv";

import connectToDatabase from "./databse.js";
import express from "express";
import cors from "cors";
//our routes
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
