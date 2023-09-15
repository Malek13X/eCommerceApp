import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },

      price: {
         type: Number,
         required: true,
      },
      quantity: { type: Number, required: true },
      imageUrl: { type: String },
      imageUUID: { type: String },
   },
   {
      timestamps: true,
   }
);

const Item = mongoose.model("item", ItemSchema);

export default Item;
