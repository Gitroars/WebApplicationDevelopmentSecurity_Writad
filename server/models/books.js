import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const bookSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: false, default: 0 },
    numberOfReviews: { type: String, required: false },
    price: { type: Number, required: true },
    productIsNew: { type: Boolean, default: false },
    stock: { type: Number, required: false, default: 1 },
  },
  { timestamps: true }
);

bookSchema.add({
  chapters: [chapterSchema],
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
