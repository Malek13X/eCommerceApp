import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
   {
      userId: {
         type: String,
         required: true,
         unique: true, // Enforces on cart per user
      },
      items: [],
      totalPrice: {
         type: Number,
         required: true,
         default: 0,
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
      updatedAt: { 
         type: Date,
         default: Date.now,
      },
   },
   { timestamps: true }
);
cartSchema.methods.calculateTotalPrice = function () {
   const items = this.items || [];
   let totalPrice = 0;

   items.forEach((item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 1;
      totalPrice += itemPrice * itemQuantity;
   });

   this.totalPrice = totalPrice;
};

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
