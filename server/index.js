import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "./databse.js";
import express from "express";
import cors from "cors";
import path from "path";
//our routes
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";

connectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/author", authorRoutes);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const port = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use("uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
