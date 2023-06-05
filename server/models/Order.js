import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    //get user details of orders and info from the user model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
      },
    ],

    paymentMethod: {
      type: String,
      default: false,
    },
    paymentDetails: {
      orderId: { type: String },
      payerId: { type: String },
    },

    totalPrice: {
      type: Number,
      default: 0.0,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
