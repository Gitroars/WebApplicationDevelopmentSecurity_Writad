import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const bookSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numberOfReviews: { type: String, required: true },
    price: { type: Number, required: true },
    isNewRelease: { type: Boolean, default: false },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", bookSchema);
export default Book;
