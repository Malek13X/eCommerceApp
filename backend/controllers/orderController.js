import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
   const { userId, items, totalPrice } = req.body;

   if (items && items.length >= 0) {
      const order = new Order({
         userId,
         items,
         totalPrice,
      });
      // order.validate(async (error) => {
      //    if (error) {
      //       // Handle validation error
      //       console.error(error);
      //    } else {
      //       // Save the order if it passes validation
      //       order
      //          .save()
      //          .then((o) => {
      //             // Order saved successfully

      //             res.status(201).json(o);
      //          })
      //          .catch((error) => {
      //             // Handle other errors, if any
      //             console.error(error);
      //          });

      //       }
      //    });
      await order.items.forEach(async (i) => {
         const item = await Item.findById(i.itemId);

         if (item) {
            if (item.quantity > 0 && item.quantity >= i.quantity) {
               item.quantity -= i.quantity;
               await item.save();
            } else {
               throw new Error("Not enough quantity of this item");
            }
         } else {
            res.status(400);
            throw new Error("Item does not exist");
         }
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
   } else {
      res.status(400);
      throw new Error("No order items");
   }
});

// Get orders for a specific user
const getOrdersByUser = asyncHandler(async (req, res) => {
   const { userId } = req.params;

   const orders = await Order.find({ userId });
   res.json(orders);
});

// @desc Get all orders for a specific user
// @route GET /api/orders/user/:userId
// @access Private (assuming user authentication is required)
const getAllOrdersByUserId = async (req, res) => {
   try {
      const { userId } = req.params;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
         res.status(404).json({ error: "User not found" });
         return;
      }

      // Fetch all orders for the user
      const orders = await Order.find({ userId });

      res.json(orders);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching orders" });
   }
};

export { createOrder, getOrdersByUser, getAllOrdersByUserId };
