import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import jwt from "jsonwebtoken";
import session from "express-session";
// @desc Create cart
// @route POST /api/carts
// @access Public
const createCart = asyncHandler(async (req, res) => {
   try {
      let userId;
      // Checks if the user is authenticated and retrieve the user ID
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         const token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded.userId);
         userId = user._id;
      } else {
         res.status(400);
         throw new Error("Invalid token");
      }

      if (userId) {
         // Check if the user already has a cart
         const existingCart = await Cart.findOne({ userId });

         if (existingCart) {
            res.status(400); // Bad request
            throw new Error("User already has a cart");
         }

         // Create a new cart if the user doesn't have one
         const cart = await Cart.create({ userId });
         res.status(201).json(cart);
      } else {
         res.status(404);
         throw new Error("User doesn't exist");
      }
   } catch (error) {
      res.status(500);
      throw new Error(error);
   }
});

// @desc Add item to cart
// @route PUT /api/cart/items/:id
// @access Public
const addItemToCart = asyncHandler(async (req, res) => {
   const quantity = req.body.quantity;
   const { id } = req.params;

   try {
      let userId;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         const token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded.userId);
         userId = user._id;
      } else {
         res.status(400);
         throw new Error("Invalid token");
      }

      if (userId) {
         // Checkthe user cart
         const cart = await Cart.findOne({ userId });

         if (!cart) {
            res.status(404);
            throw new Error("Cart not found");
         }

         const item = await Item.findOne({ _id: id });

         // Check if item is out-of-stock
         if (item.quantity === 0) {
            res.status(400);
            throw new Error("Item is out of stock");
         }

         // Check if the quantity of items ordered is available.
         if (item.quantity < quantity) {
            res.status(400);
            throw new Error("Exceeding the available stock");
         }

         const existingItemIndex = cart.items.findIndex(
            (item) => item._id.toString() === id
         );

         // Check if item is already in cart and update it
         if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity = quantity;
            cart.markModified("items"); // Mark the 'items' array as modified

            await cart.calculateTotalPrice();
            await cart.save();

            res.status(200).json(cart);
         } else {
            const itemToCart = item;
            itemToCart.quantity = quantity;

            cart.items.push(itemToCart);
            await cart.calculateTotalPrice();
            await cart.save();
            res.status(200).json(cart);
         }
      } else {
         res.status(404);
         throw new Error("User doesn't exist");
      }
   } catch (error) {
      res.status(500);
      throw new Error(error);
   }
});

// @desc Remove item from cart
// @route DELETE /api/cart/:cartId/items/:id
// @access Public
const removeItemFromCart = asyncHandler(async (req, res) => {
   const { id } = req.params;

   try {
      let userId;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         const token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded.userId);
         userId = user._id;
      } else {
         res.status(400);
         throw new Error("Invalid token");
      }

      if (userId) {
         // Check the user cart
         const cart = await Cart.findOne({ userId });

         if (!cart) {
            res.status(404);
            throw new Error("Cart not found");
         }
         cart.items = cart.items.filter((item) => item._id.toString() !== id);

         await cart.calculateTotalPrice();
         await cart.save();

         res.status(200).json(cart);
      } else {
         res.status(404);
         throw new Error("User doesn't exist");
      }
   } catch (error) {
      res.status(500);
      throw new Error(error);
   }
});
// @desc Remove all items from cart
// @route DELETE /api/cart/removeAll
// @access Public
const removeAllItemsFromCart = asyncHandler(async (req, res) => {
   try {
      let userId;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         const token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded.userId);
         userId = user._id;
      } else {
         res.status(400);
         throw new Error("Invalid token");
      }

      if (userId) {
         // Check the user cart
         const cart = await Cart.findOne({ userId });

         if (!cart) {
            res.status(404);
            throw new Error("Cart not found");
         }
         cart.items = [];

         await cart.calculateTotalPrice();
         await cart.save();

         res.status(200).json(cart);
      } else {
         res.status(404);
         throw new Error("User doesn't exist");
      }
   } catch (error) {
      res.status(500);
      throw new Error(error);
   }
});
// @desc Get cart
// @route GET /api/cart/
// @access Public
const getCart = asyncHandler(async (req, res) => {
   try {
      let userId;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         const token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded.userId);
         userId = user._id;
      } else {
         res.status(400);
         throw new Error("Invalid token");
      }

      if (userId) {
         const cart = await Cart.findOne({ userId });

         if (!cart) {
            res.status(404);
            throw new Error("Cart not found");
         }
         res.status(200).json(cart);
      } else {
         res.status(404);
         throw new Error("User doesn't exist");
      }
   } catch (error) {
      res.status(500);
      throw new Error(error);
   }
});

export {
   createCart,
   addItemToCart,
   removeItemFromCart,
   removeAllItemsFromCart,
   getCart,
};
