import dotenv from "dotenv";

import connectToDatabase from "./databse.js";
import express from "express";
import cors from "cors";
//our routes
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
