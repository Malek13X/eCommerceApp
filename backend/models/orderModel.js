import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   items: [
      {
         itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
         },
      },
   ],
   // shippingAddress: {
   //    type: String,
   //    required: true,
   // },
   totalPrice: {
      type: Number,
      required: true,
   },
   orderDate: {
      type: Date,
      default: Date.now,
   },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
