const mongoose = require("mongoose");
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
      image: { type: String },
   },
   {
      timestamps: true,
   }
);

module.exports = Item = mongoose.model("item", itemSchema);
