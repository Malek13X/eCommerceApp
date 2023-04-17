import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      categories: [
         {
            type: String,
            required: true,
         },
      ],
      price: {
         type: Number,
         required: true,
      },
      imageUrl: { type: String },
      imageUUID: { type: String },
   },
   {
      timestamps: true,
   }
);
const Item = mongoose.model("item", itemSchema);

export default Item;
